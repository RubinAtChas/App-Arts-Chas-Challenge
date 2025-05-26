#ifndef HTTP_H
#define HTTP_H
#include "Arduino_secrets.h"

WiFiClient wifiClient;
HttpClient client = HttpClient(wifiClient, LOCALHOST_URL, PORT);

void sendToSupabase(float* tempC, int light, char* rain, int moisture) 
{
    // String jsonBody = "{\"moisture\":35,\"flower_temp\":13,\"dirt_temp\":18,\"sunlight\":\"full\",\"nitrogen_level\":45,\"phosphor\":12,\"potassium\":29}";
    String jsonBody = "{\"sunlight\":\"light\"}";

    client.beginRequest();
    client.put(PATH);
    client.sendHeader("Content-Type", "application/json");
    client.sendHeader("x-api-key", SENSOR_API_KEY);
    client.sendHeader("Content-Length", jsonBody.length());
    client.beginBody();
    client.print(jsonBody);
    client.endRequest();

    int statusCode = client.responseStatusCode();
    String response = client.responseBody();

    Serial.print("Svarskod: ");
    Serial.println(statusCode);
    Serial.println("Svar från server:");
    Serial.println(response);
}

#endif // HTTP_H