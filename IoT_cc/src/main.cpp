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
char rainReading[50] = "";

WiFiServer server(80); // Webserver på port 80

void setup()
{
  Serial.begin(9600);
  while (!Serial)
  {
    delay(10);
  }

  // initializeLightSensor();
  ConnectToWifi();
  initializeTimeClient();
  pinMode(rainDigitalPin, INPUT);

  server.begin();
  Serial.println("Server Startad");
}

void loop()
{
  // sunlightReading = readSunlight();

  readTemperature(&tempertureReading);
  moistureReading = readMoisture();
  readRainDate(rainReading);

  // Skicka till Supabase
  sendToSupabase(&tempertureReading, sunlightReading, rainReading, moistureReading);

  reconnectToWifi();

  delay(5000); // Vänta 10 sek innan nästa mätning
}