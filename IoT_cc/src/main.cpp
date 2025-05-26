#include <Arduino.h>
#include "Adafruit_LTR329_LTR303.h"
#include <math.h>
#include <WiFiS3.h>
#include <ArduinoHttpClient.h>
#include <WiFiClient.h>
#include "../include/http.h"
#include "../include/wifi_arduino.h"
#include "../include/moisture.h"
#include "../include/rain.h"
#include "../include/sunlight.h"
#include "../include/temperature.h"

int sunlightReading = 0;
float tempertureReading = 0;
int moistureReading = 0;
char rainReading[] = "";

WiFiServer server(80); // Webserver på port 80

void setup()
{
  Serial.begin(9600);
  while (!Serial)
  {
    delay(10);
  }

  initializeLightSensor();

  pinMode(rainDigitalPin, INPUT);

  ConnectToWifi();
  server.begin();
  Serial.println("Server Startad");
}

void loop()
{
  sunlightReading = readSunlight();
  readRainDate(rainReading);
  readTemperature(&tempertureReading);
  moistureReading = readMoisture();


  // Skicka till Supabase
  sendToSupabase(&tempertureReading, sunlightReading, rainReading, moistureReading);

  reconnectToWifi();

  delay(1000); // Vänta 1 sek innan nästa mätning
}