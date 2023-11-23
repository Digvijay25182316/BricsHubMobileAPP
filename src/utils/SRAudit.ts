import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to submit an audit
export async function submitAudit() {
  try {
    // Retrieve the current value and date from AsyncStorage
    const storedValue: any = await AsyncStorage.getItem('SRAudit');
    const storedDate = await AsyncStorage.getItem('SRAuditDate');

    // Get the current date
    const currentDate = new Date().toDateString();

    if (storedDate !== currentDate) {
      // If the stored date is different from the current date, reset the value to 1
      await AsyncStorage.setItem('SRAudit', '1');
      await AsyncStorage.setItem('SRAuditDate', currentDate);
      console.log('New day, reset audit count to 1');
    } else {
      // Increment the value by 1
      const newValue = (parseInt(storedValue) || 0) + 1;
      await AsyncStorage.setItem('SRAudit', newValue.toString());
      console.log(`Audit submitted. Total count: ${newValue}`);
    }
  } catch (error) {
    console.error('Error submitting audit:', error);
  }
}

// Function to retrieve the total audit count
export async function getTotalAuditCount() {
  try {
    const totalCount = await AsyncStorage.getItem('SRAudit');
    return totalCount ? parseInt(totalCount) : 0;
  } catch (error) {
    console.error('Error getting total audit count:', error);
    return 0;
  }
}
