#include <Arduino.h>
#include "Adafruit_LTR329_LTR303.h"
#include <math.h>
#include "WIFI_ARDUINO.h"
#include <WiFiS3.h>
#include <ArduinoHttpClient.h>
#include <WiFiClient.h>
#include "http.h"

// --- LTR-303 Light Sensor ---
Adafruit_LTR303 ltr = Adafruit_LTR303();
WiFiServer server(80);  // Webserver på port 80

//const char* server = "http://localhost:3000/api/sensor/update/";

// --- Rain Sensor MH-RD ---
const int rainAnalogPin = A0;
const int rainDigitalPin = 2;

// --- NTC Temperature Sensor ---
const int tempAnalogPin = A1;
const float seriesResistor = 10000.0;
const float nominalResistance = 10000.0;
const float nominalTemperature = 25.0;
const float betaCoefficient = 3950.0;
const float VREF = 5.0;

// --- Soil Moisture Sensor ---
const int moisturePin = A2;
const int moistureThreshold = 800;

void setup()
{
  Serial.begin(9600);
  while (!Serial)
    delay(10);

  Serial.println("Initierar LTR-303...");
  if (!ltr.begin())
  {
    Serial.println("Hittade inte LTR-303 sensorn!");
    while (1)
      delay(10);
  }
  Serial.println("LTR-303 hittad!");
  ltr.setGain(LTR3XX_GAIN_1);
  ltr.setIntegrationTime(LTR3XX_INTEGTIME_50);
  ltr.setMeasurementRate(LTR3XX_MEASRATE_50);

  pinMode(rainDigitalPin, INPUT);

  ConnectToWifi();
  server.begin();
  Serial.println("Server Startad");
}

void loop()
{
  // ----- LÄS LJUSSENSOR -----
  uint16_t ch0 = 0, ch1 = 0;
  if (ltr.newDataAvailable())
  {
    if (ltr.readBothChannels(ch0, ch1))
    {
      uint16_t approx_PAR = (ch0 > ch1) ? (ch0 - ch1) : 0;
      Serial.print("Ljus (CH0): "); Serial.print(ch0);
      Serial.print("  IR (CH1): "); Serial.print(ch1);
      Serial.print("  Synligt (approx PAR): "); Serial.println(approx_PAR);
    }
    else
    {
      Serial.println("Misslyckades läsa ljusdata");
    }
  }

  // ----- LÄS REGNSENSOR -----
  int rainA = analogRead(rainAnalogPin);
  int rainD = digitalRead(rainDigitalPin);
  Serial.print("Regn - Analogt: "); Serial.print(rainA);
  Serial.print("  Digitalt: "); Serial.println(rainD == LOW ? "Regn!" : "Torrt");

  // ----- LÄS TEMPERATUR -----
  int raw = analogRead(tempAnalogPin);
  float tempC = -0.1 * raw + 62.7;
  Serial.print("Temp analogt värde: "); Serial.print(raw);
  Serial.print("  Beräknad temperatur: "); Serial.print(tempC, 1);
  Serial.println(" °C");

  // ----- LÄS FUKT -----
  int moistureValue = analogRead(moisturePin);
  Serial.print("Fukt (AO) "); Serial.print(moistureValue);
  if (moistureValue < moistureThreshold)
    Serial.println(" - Behöver ej vattnas");
  else
    Serial.println(" - Dags att vattna plantan");

  Serial.println("----------------------------------");

  // Skicka till Supabase
  sendToSupabase(tempC, ch0, rainA, moistureValue);

  reconnectToWifi();

  delay(1000);  // Vänta 1 sek innan nästa mätning
}