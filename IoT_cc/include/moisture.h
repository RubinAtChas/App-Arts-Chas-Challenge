#ifndef moisture_h
#define moisture_h
// --- Soil Moisture Sensor ---
const int moisturePin = A2;
const int moistureThreshold = 800;

int readMoisture()
{
    // ----- LÄS FUKT -----
    int moistureValue = analogRead(moisturePin);
    Serial.print("Fukt (AO) ");
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
    return moistureValue;
}

#endif moisture_h