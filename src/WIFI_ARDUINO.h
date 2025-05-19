#ifndef WIFI_ARDUINO_H
#define WIFI_ARDUINO_H
#include <Arduino.h>
#include <WiFiS3.h>
#include "arduino_secrets.h"
//  YOU NEED THIS IN A SEPERATE "arduino_secrets.h" FILE OR IT WILL NOT WORK/COMPILE
//
//  -----  WiFi Settings  ----
//  const char SSID[] = "SSID_NAME_HERE";           // your WiFi network name
//  const char PASSWORD[] = "WIFI_PASSWORD_HERE";   // your WiFi password
#define WIFI_RECONNECTION_ATTEMPTS 10               // Used in connectToWifi()
#define WIFI_TIME_BETWEEN_RECONNECTION 1000         // Defined in milliseconds. Used in connectToWifi()
/**
 * @brief Meant to be used in setup() and does NOT handle errors
 */
void ConnectToWifi()
{
    WiFi.disconnect(); // Ensures a clean start
    WiFi.end();        // Hard reset of the WiFi module
    delay(1000);       // Give it time(ms) to reset
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
#endif // WIFI_ARDUINO_H