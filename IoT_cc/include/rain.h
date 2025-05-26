#ifndef rain_h
#define rain_h
// --- Rain Sensor MH-RD ---
const int rainAnalogPin = A0;
const int rainDigitalPin = 2;

// ----- LÄS REGNSENSOR -----
void readRainDate(char *rainReading)
{
  int rainA = analogRead(rainAnalogPin);
  int rainD = digitalRead(rainDigitalPin);
  Serial.print("Regn - Analogt: "); Serial.print(rainA);
  Serial.print("  Digitalt: "); Serial.println(rainD == LOW ? "Regn!" : "Torrt");
}

#endif rain_h