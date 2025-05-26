#ifndef sunlight_h
#define sunlight_h

// --- LTR-303 Light Sensor ---
Adafruit_LTR303 ltr = Adafruit_LTR303();

void initializeLightSensor()
{
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
}

  // ----- LÄS LJUSSENSOR -----
  int readSunlight()
  {
  uint16_t ch0 = 0, ch1 = 0, approx_PAR = 0;
  if (ltr.newDataAvailable())
  {
    if (ltr.readBothChannels(ch0, ch1))
    {
      approx_PAR = (ch0 > ch1) ? (ch0 - ch1) : 0;
      Serial.print("Ljus (CH0): "); Serial.print(ch0);
      Serial.print("  IR (CH1): "); Serial.print(ch1);
      Serial.print("  Synligt (approx PAR): "); Serial.println(approx_PAR);
    }
    else
    {
      Serial.println("Misslyckades läsa ljusdata");
    }
  }
  return approx_PAR;
}
#endif sunlight_h