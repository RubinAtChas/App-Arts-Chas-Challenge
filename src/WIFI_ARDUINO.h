#ifndef WIFI_ARDUINO_H
#define WIFI_ARDUINO_H
#include <Arduino.h>
#include <WiFiS3.h>
#include "arduino_secrets.h"

#define WIFI_RECONNECTION_ATTEMPTS 10
#define WIFI_TIME_BETWEEN_RECONNECTION 1000

void ConnectToWifi()
{
    WiFi.disconnect();
    WiFi.end();
    delay(1000);
    int numberOfAttempts = 0;
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.println("Attempting to connect to Wi-Fi.");
        WiFi.begin(SSID, PASSWORD);
        if (WiFi.status() == WL_CONNECTED)
    {
        Serial.println("Connected!");
        numberOfAttempts = 0;
        return;
    }
    Serial.print("Attempt: ");
    Serial.print(numberOfAttempts + 1);
    Serial.print("\n");
    Serial.print("Wi-Fi Status Code: ");
    Serial.print(WiFi.status());
    Serial.print("\n");
    if (numberOfAttempts >= WIFI_RECONNECTION_ATTEMPTS)
    {
        Serial.println("Connection failed.");
        return;
    }
    numberOfAttempts++;
    delay(WIFI_TIME_BETWEEN_RECONNECTION);
    }
}

void reconnectToWifi()
{
  if (WiFi.status() != WL_CONNECTED)
  {
    ConnectToWifi();
  }
}

#endif // WIFI_ARDUINO_H