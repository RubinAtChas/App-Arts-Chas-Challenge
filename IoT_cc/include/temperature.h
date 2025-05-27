#ifndef temperture_h
#define temperture_h

// --- NTC Temperature Sensor ---
const int tempAnalogPin = A1;
const float seriesResistor = 10000.0;
const float nominalResistance = 10000.0;
const float nominalTemperature = 25.0;
const float betaCoefficient = 3950.0;
const float VREF = 5.0;

void readTemperature(float *tempertureReading)
{
  // ----- LÄS TEMPERATUR -----
  int raw = analogRead(tempAnalogPin);
  float tempC = -0.1 * raw + 62.7;
  Serial.print("Temp analogt värde: ");
  Serial.print(raw);
  Serial.print("  Beräknad temperatur: ");
  Serial.print(tempC, 1);
  Serial.println(" °C");
  *tempertureReading = tempC;
}
#endif temperture_h