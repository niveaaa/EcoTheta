#include <Wire.h>
#include <LiquidCrystal_I2C.h>

#define BUZZER_PIN 3

// Initialize the LCD with I2C address 0x27 and dimensions 20x4
LiquidCrystal_I2C lcd(0x27, 20, 4);

void setup() 
{
  pinMode(BUZZER_PIN, OUTPUT);  // Set buzzer pin as output
  Serial.begin(9600);           // Start serial communication
  lcd.init();                   // Initialize the LCD
  lcd.backlight();              // Turn on the LCD backlight
  lcd.setCursor(0, 0);
  lcd.print("Carbon Emission");
}

void loop() 
{
  int sensorValue = analogRead(A0);  // Read value from sensor
  //Serial.println(sensorValue);       // Print value to Serial Monitor
  
  // Display the sensor value on the LCD at position (0, 1)
  lcd.setCursor(0, 1);
  lcd.print("Value: ");
  lcd.print(sensorValue);
  lcd.print("   ");  // Clear trailing digits if sensor value decreases

  // Control the buzzer based on sensor value
  if (sensorValue > 314) 
  {
    digitalWrite(BUZZER_PIN, HIGH);  // Turn on the buzzer
    Serial.println(sensorValue); 
  } 
  else 
  {
    digitalWrite(BUZZER_PIN, LOW);   // Turn off the buzzer
  }

  delay(1000);  // Wait for 1 second before the next reading
}
