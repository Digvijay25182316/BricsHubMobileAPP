import RNFS from 'react-native-fs';

export const exportCSV = async (formData: Audit[]) => {
  const csvContent =
    'ProjectID,PlotID,latitude,longitude,AuditID\n' +
    formData.map(row => Object.values(row).join(',')).join('\n');

  try {
    const timestamp = new Date()?.toString()?.split('G')[0].toString();
    const formattedTimestamp = timestamp?.replace(/\s/g, '_'); // Replace spaces with underscores

    const path =
      RNFS.DownloadDirectoryPath + `/${formattedTimestamp}_Audit_data.csv`;

    // Check if the directory exists, create it if necessary
    await RNFS.mkdir(RNFS.DownloadDirectoryPath);

    await RNFS.writeFile(path, csvContent, 'utf8');
    console.log('CSV file saved at:', path);
  } catch (error: any) {
    console.error('Error saving CSV file:', error.message || error);
  }
};
