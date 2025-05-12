#include <Arduino.h>
#include "Adafruit_LTR329_LTR303.h"
#include <math.h>

// --- LTR-303 Light Sensor (Visible + IR) ---
Adafruit_LTR303 ltr = Adafruit_LTR303();

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
}

void loop()
{
  // ----- LÄS LJUSSENSOR -----
  if (ltr.newDataAvailable())
  {
    uint16_t ch0, ch1;
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
  int tempADC = analogRead(tempAnalogPin);
  float voltage = tempADC * (VREF / 1023.0);
  float resistance = seriesResistor * (VREF / voltage - 1.0);
  float tempK = 1.0 / (1.0 / (nominalTemperature + 273.15) +
                       (log(resistance / nominalResistance) / betaCoefficient));
  float tempC = tempK - 273.15;
  Serial.print("Temp ADC: ");
  Serial.print(tempADC);
  Serial.print("  Volt: ");
  Serial.print(voltage, 2);
  Serial.print(" V  Rntc: ");
  Serial.print(resistance, 0);
  Serial.print(" Ω  Temp: ");
  Serial.print(tempC, 2);
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
}