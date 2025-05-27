#ifndef rain_h
#define rain_h
#include <WiFiS3.h>
#include <NTPClient.h>
#include <WiFiUdp.h>

WiFiUDP ntpUDP;
NTPClient timeClient(ntpUDP, "pool.ntp.org", 3600, 6000); // UTC+1, uppdateras varje 60 sek

// --- Rain Sensor MH-RD ---
const int rainAnalogPin = A0;
const int rainDigitalPin = 2;

void initializeTimeClient()
{
  timeClient.begin();
}

// ----- LÄS REGNSENSOR -----
void readRainDate(char *rainReading)
{

  int rainA = analogRead(rainAnalogPin);
  int rainD = digitalRead(rainDigitalPin);
  Serial.print("Regn - Analogt: ");
  Serial.print(rainA);
  Serial.print("  Digitalt: ");
  Serial.println(rainD == LOW ? "Regn!" : "Torrt");
  timeClient.update();
  time_t rawTime = timeClient.getEpochTime();
  struct tm *ti;
  ti = gmtime(&rawTime); // Använd gmtime() för UTC (inte localtime())

  // Format: YYYY-MM-DDTHH:MM:SSZ
  char buffer[50];
  sprintf(buffer, "%04d-%02d-%02dT%02d:%02d:%02dZ",
          ti->tm_year + 1900, ti->tm_mon + 1, ti->tm_mday,
          ti->tm_hour, ti->tm_min, ti->tm_sec);

  strcpy(rainReading, buffer); // Kopiera till rainReading
}

#endif rain_h