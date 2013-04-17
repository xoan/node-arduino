float temp;
int temp_pin = 0; // LM35DZ
boolean send = false;
int led_pin = 8; // LED

long prevMillis = 0;
long interval = 1000;

void setup() {
  pinMode(led_pin, OUTPUT);

  Serial.begin(9600);
}

void loop() {
  char in_char = Serial.read();
  switch (in_char) {
  case 'c': // Connect
    send = true;
    break;
  case 'x': // Disconnect
    send = false;
    break;
  case 'h': // HIGH
    digitalWrite(led_pin, HIGH);
    break;
  case 'l': // LOW
    digitalWrite(led_pin, LOW);
    break;
  }

  if (send) {
    unsigned long curMillis = millis();
    if (curMillis - prevMillis > interval) {
      prevMillis = curMillis;

      temp = analogRead(temp_pin);
      temp = (5.0 * temp * 100.0) / 1024.0;
      Serial.println((byte)temp);
    }
  }
}
