# Component List – Smart Crop Monitoring System

This document lists all components used in the prototype of our smart crop monitoring system.
The system monitors soil nutrients (NPK), temperature, humidity, soil moisture, and transmits data for further analysis.

---

## Microcontroller & Core Logic

| Component                         | Qty | Description | Price | Link |
|-----------------------------------|:---:|-------------|-------|------|
| Arduino UNO R4 WiFi               | 1   | Main microcontroller – reads sensor data, handles communication via WiFi, and runs all system logic | - | Already got one |
| RS485 to TTL Converter Module (MAX485CPA+DIP-8) | 5   | Allows communication between the Arduino and the NPK sensor using Modbus protocol | 10:- | [AliExpress](https://www.aliexpress.com/item/1005005737922222.html?spm=a2g0o.productlist.main.1.7a0b17Hj17Hjlc&algo_pvid=ea2c8698-c83d-4eb5-a13a-d211c49ceb2a&algo_exp_id=ea2c8698-c83d-4eb5-a13a-d211c49ceb2a-0&pdp_ext_f=%7B"order"%3A"607"%2C"eval"%3A"1"%7D&pdp_npi=4%40dis!SEK!15.39!10.16!!!1.50!0.99!%402103835e17434117853383217eac56!12000044526963477!sea!SE!0!ABX&curPageLogUid=SKR4jbzp0lKb&utparam-url=scene%3Asearch%7Cquery_from%3A) OBS! Välj 5 stycken. Det kostar lika mycket som att köpa 1st, men vi får reserver, ifalla tt någon inte fungerar |

---

## Sensors

| Component                                | Qty | Description | Price | Link |
|------------------------------------------|:---:|-------------|-------|------|
| Soil NPK Sensor (NPKTHC-S, RS485)        | 1   | Prototype sensor measuring Nitrogen (N), Phosphorus (P), and Potassium (K) levels in soil | 449:- + 79:- frakt | [AliExpress](https://www.aliexpress.com/item/1005005684119688.html) OBS! Det är flera olika sensorer på samma sida, så se till att välja rätt sensor |
| Temperature Sensor (Analog + Digital)    | 1   | Measures temperature with both analog and digital output | 36:- | [Electrokit](https://www.electrokit.com/temperatursensor-analogdigital) |

---

## Power Supply

| Component                                 | Qty | Description | Price | Link |
|-------------------------------------------|:---:|-------------|-------|------|
| Battery holder 6x AA kontakt (6F22)     | 1   | Powers the full system with standard AA batteries for easy field testing | 23:- | [Electrokit](https://www.electrokit.com/batterihallare-6x-aa-kontakt-6f22) |
| AA Batteries (1.5V, Varta, 10-pack)       | 1 pack | Supplies 12V to the system via battery holder | 55:- | [Electrokit](https://www.electrokit.com/aa-/-lr6-alkaliska-batterier-varta-10-pack) |

---

## Display (Optional)

| Component                        | Qty | Description | Price | Link |
|----------------------------------|:---:|-------------|-------|------|
| OLED Display (128x64, I2C)       | 1   | Displays sensor readings in real time directly on the unit | - | Already got one |

---

## Wiring & Assembly

| Component                                         | Qty | Description |
|---------------------------------------------------|:---:|-------------|
| Hook-up Wire (22 AWG solid core, red/black/green) | 1 roll per color | For clean and reliable connections; color-coded for power, ground, and signal | Already got it |
| Solder Wire (Lead-free preferred)                 | 1 spool | For soldering components onto perfboard | Already got it |

---

## Optional Extras / Nice-to-Haves

| Component                          | Qty | Description |
|-----------------------------------|:---:|-------------|
| Heat Shrink Tubing or Electrical Tape | - | For insulating exposed connections |
| Mounting Screws, Tape, or Glue    | - | For securing components inside the enclosure |
| Terminal Blocks or Screw Terminals | - | For modular wiring and easy replacements (optional) |
| Plastic Enclosure Box (medium)  | 1   | Protects the electronics for outdoor use | 
| On/Off Power Switch (2-pin)               | 1   | Simple toggle switch to prevent battery drain when the system is not in use | - | - |
