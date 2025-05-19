#include <Arduino.h>
#include "Adafruit_LTR329_LTR303.h"
#include <math.h>
#include "WIFI_ARDUINO.h"
#include <WiFiS3.h>

// --- LTR-303 Light Sensor (Visible + IR) ---
Adafruit_LTR303 ltr = Adafruit_LTR303();

WiFiServer server(80);  // Webserver på port 80

  void reconnectToWifi()
  {
    if(WiFi.status() != WL_CONNECTED)
    {
      ConnectToWifi();
    }
  }

// --- Rain Sensor MH-RD ---
const int rainAnalogPin = A0; // Analog ingång från MH-RD
const int rainDigitalPin = 2; // Digital ingång från MH-RD

// --- NTC Temperature Sensor ---
const int tempAnalogPin = A1;            // AO från NTC-modulen
const float seriesResistor = 10000.0;    // Fasta motståndet (Ω)
const float nominalResistance = 10000.0; // R0 vid 25 °C (Ω)
const float nominalTemperature = 25.0;   // T0 i °C
const float betaCoefficient = 3950.0;    // β-värde för termistorn (K)
const float VREF = 5.0;                  // ADC-referensspänning (V)

// --- Soil Moisture Sensor ---
const int moisturePin = A2;        // Analog ingång från fuktsensorn
const int moistureThreshold = 800; // Tröskelvärde för vattning

void setup()
{
  Serial.begin(9600);
  while (!Serial)
    delay(10);

  // Initiera ljussensor
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

  // Initiera regnsensor
  pinMode(rainDigitalPin, INPUT);

  ConnectToWifi();
  server.begin();
  Serial.println("Server Startad");
}


void loop()
{
  // ----- LÄS LJUSSENSOR -----
    uint16_t ch0, ch1; 
    if (ltr.newDataAvailable())
  {
 
    if (ltr.readBothChannels(ch0, ch1))
    {
      uint16_t approx_PAR = (ch0 > ch1) ? (ch0 - ch1) : 0;
      Serial.print("Ljus (CH0): ");
      Serial.print(ch0);
      Serial.print("  IR (CH1): ");
      Serial.print(ch1);
      Serial.print("  Synligt (approx PAR): ");
      Serial.println(approx_PAR);
    }
    else
    {
      Serial.println("Misslyckades läsa ljusdata");
    }
  }

  // ----- LÄS REGNSENSOR -----
  int rainA = analogRead(rainAnalogPin);
  int rainD = digitalRead(rainDigitalPin);
  Serial.print("Regn - Analogt: ");
  Serial.print(rainA);
  Serial.print("  Digitalt: ");
  Serial.println(rainD == LOW ? "Regn!" : "Torrt");

  // ----- LÄS TEMPERATURSENSOR -----
const int tempAnalogPin = A1;  // Analog ingång från NTC-modulen


  int raw = analogRead(tempAnalogPin);
  float tempC = -0.1 * raw + 62.7;

  Serial.print("Temp analogt värde: ");
  Serial.print(raw);
  Serial.print("  Beräknad temperatur: ");
  Serial.print(tempC, 1);
  Serial.println(" °C");


  // ----- LÄS FUKTSENSOR -----
  int moistureValue = analogRead(moisturePin);
  Serial.print("Fukt (AO)");
  Serial.print(moistureValue);
  if (moistureValue < moistureThreshold)
  {
    Serial.println(" - Behöver ej vattnas");
  }
  else
  {
    Serial.println(" - Dags att vattna plantan");
  }

  Serial.println("----------------------------------");
  delay(1000);

  reconnectToWifi();
    // Hantera inkommande webbförfrågningar
  WiFiClient client = server.available();
  if (client) {
    Serial.println("Ny klient ansluten");

    // Vänta tills data kommer
    while (client.connected() && !client.available()) {
      delay(1);
    }

    String request = client.readStringUntil('\r');
    Serial.print("Förfrågan: ");
    Serial.println(request);
    client.flush();

    // Skriv HTML-svar
    client.println("HTTP/1.1 200 OK");
    client.println("Content-Type: text/html");
    client.println("Connection: close");
    client.println();
    client.println("<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Sensorvärden</title></head><body>");
    client.println("<h2>Sensorvärden från Arduino</h2>");
    client.print("<p>Ljus CH0: "); client.print(ch0); client.println("</p>");
    client.print("<p>IR CH1: "); client.print(ch1); client.println("</p>");
    client.print("<p>Synligt ljus (approx PAR): "); client.print((ch0 > ch1) ? (ch0 - ch1) : 0); client.println("</p>");
    client.print("<p>Regn (analogt): "); client.print(rainA); client.println("</p>");
    client.print("<p>Regn (digitalt): "); client.print((rainD == LOW) ? "Regn!" : "Torrt"); client.println("</p>");
    client.print("<p>Temperatur: "); client.print(tempC, 1); client.println(" °C</p>");
    client.print("<p>Fukt: "); client.print(moistureValue);
    if (moistureValue < moistureThreshold) {
      client.println(" - Behöver ej vattnas</p>");
    } else {
      client.println(" - Dags att vattna plantan</p>");
    }
    client.println("</body></html>");

    delay(1);
    client.stop();
    Serial.println("Klient kopplad från");
  }

}