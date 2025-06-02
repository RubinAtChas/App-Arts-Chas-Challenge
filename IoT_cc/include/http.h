#ifndef HTTP_H
#define HTTP_H
#include "Arduino_secrets.h"
#include <WiFiS3.h>
#include <WiFiSSLClient.h>

// how is it even connected???
// WiFiClient wifiClient;
// HttpClient client = HttpClient(wifiClient, LOCALHOST_URL, PORT);

void parseHttpResponse(Client &client)
{
    int statusCode = -1;
    String response = "";
    bool headersEnded = false;

    // Read and parse headers
    while (client.available())
    {
        String line = client.readStringUntil('\n');

        // Get status code from the first line
        if (statusCode == -1 && line.startsWith("HTTP/1.1"))
        {
            int firstSpace = line.indexOf(' ');
            int secondSpace = line.indexOf(' ', firstSpace + 1);
            if (firstSpace > 0 && secondSpace > 0)
            {
                String codeStr = line.substring(firstSpace + 1, secondSpace);
                statusCode = codeStr.toInt();
            }
        }

        // End of headers
        if (line == "\r" || line.length() == 1)
        {
            headersEnded = true;
            break;
        }
    }

    // Read the body
    if (headersEnded)
    {
        while (client.available())
        {
            response += client.readStringUntil('\n');
        }
    }

    // Output
    Serial.print("Svarskod: ");
    Serial.println(statusCode);
    Serial.println("Svar från server:");
    Serial.println(response);
}

void postToServer(const char *hostToUse, const char *path, const String &json)
{
    WiFiClient wifiClient;
    WiFiSSLClient wifiSSLClient;

    // Choose the correct client type based on SSL flag
    Client &client = useSSL ? static_cast<Client &>(wifiSSLClient) : static_cast<Client &>(wifiClient);

    Serial.print("Connecting to ");
    Serial.print(hostToUse);
    Serial.print(":");
    Serial.println(PORT);

    if (client.connect(hostToUse, PORT))
    {
        Serial.println("Connected to server.");

        // Send HTTP request
        client.print(String("PUT ") + path + " HTTP/1.1\r\n");
        client.print(String("Host: ") + hostToUse + "\r\n");
        client.print("Content-Type: application/json\r\n");
        client.print("x-api-key: ");
        client.print(SENSOR_API_KEY);
        client.print("\r\n");
        client.print("Content-Length: ");
        client.print(json.length());
        client.print("\r\n");
        client.print("Connection: close\r\n"); // ensure proper close
        client.print("\r\n");                  // end headers
        client.print(json);                    // body

        Serial.println("Sent JSON:");
        Serial.println(json);

        // Wait for response
        unsigned long timeout = millis();
        while (client.available() == 0)
        {
            if (millis() - timeout > 5000)
            {
                Serial.println(">>> Timeout waiting for response");
                client.stop();
                return;
            }
        }

        parseHttpResponse(client);

        // Read and print the response
        unsigned long readStart = millis();
        while ((millis() - readStart) < 5000)
        {
            if (client.available())
            {
                String line = client.readStringUntil('\n');
                Serial.println(line);
                readStart = millis(); // reset timeout on each line read
            }
        }

        client.stop();
        Serial.println("Connection closed.");
    }
    else
    {
        Serial.println("Failed to connect to backend.");
        Serial.print("Host: ");
        Serial.println(hostToUse);
        Serial.print("Port: ");
        Serial.println(PORT);
    }
}

String makeJsonPayload(float moisture, float temp, float light, const char *lastWatered)
{
    String jsonBody = "{";
    jsonBody += "\"moisture\": " + String(moisture) + ",";
    jsonBody += "\"temp\": " + String(temp) + ",";
    jsonBody += "\"light\": " + String(light) + ",";
    jsonBody += "\"last_watered\": \"" + String(lastWatered) + "\"";
    jsonBody += "}";
    return jsonBody;
}

void sendToSupabase(float *tempC, int light, char *rain, int moisture)
{
    String jsonBody = makeJsonPayload(moisture, *tempC, light, rain);
    postToServer(LOCALHOST_URL, "/api/sensor/update/33", jsonBody);
}
#endif // HTTP_H