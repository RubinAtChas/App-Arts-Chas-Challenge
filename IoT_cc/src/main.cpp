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
}

unsigned long lastSendTime = 0;
const unsigned long sendInterval = 5000; // 10 seconds

void loop()
{

  unsigned long currentTime = millis();

  if (currentTime - lastSendTime >= sendInterval)
  {

    lastSendTime = currentTime;
    // sunlightReading = readSunlight();
    readTemperature(&tempertureReading);
    moistureReading = readMoisture();
    readRainDate(rainReading);

    // Skicka till Supabase
    sendToSupabase(&tempertureReading, sunlightReading, rainReading, moistureReading);

    reconnectToWifi();

    // delay(5000); // Vänta 10 sek innan nästa mätning
  }
}