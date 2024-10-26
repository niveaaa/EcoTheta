int gasSensorPin = A0;   // Analog pin for gas sensor
int buzzerPin = 5;        // Digital pin for buzzer
int threshold = 400;      // Threshold value for gas detection (adjust as needed)

void setup() {
  pinMode(gasSensorPin, INPUT);   // Set gas sensor pin as input
  pinMode(buzzerPin, OUTPUT);     // Set buzzer pin as output
  Serial.begin(9600);             // Initialize Serial Monitor
}

void loop() {
  int gasValue = analogRead(gasSensorPin);  // Read gas sensor value
  Serial.print("Gas Level: ");
  Serial.println(gasValue);  // Print the gas value to the Serial Monitor

  if (gasValue > threshold) {
    digitalWrite(buzzerPin, HIGH);  // Activate buzzer if gas detected
  } else {
    digitalWrite(buzzerPin, LOW);   // Turn off buzzer if gas is normal
  }
  delay(1000);  // Wait for 1 second before the next reading
}
