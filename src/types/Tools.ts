import RNFS from 'react-native-fs';
import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

async function checkAndRequestPermissions(): Promise<boolean> {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to your storage to save files.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Write external storage permission granted');
      return true;
    } else {
      console.log('Write external storage permission denied');
      return false;
    }
  } catch (error) {
    console.warn('Error checking permissions:', error);
    return false;
  }
}

export const exportCSV = async (formData: Audit[]) => {
  const csvContent =
    'ProjectID,PlotID,latitude,longitude,AuditID\n' +
    formData.map(row => Object.values(row).join(',')).join('\n');

  try {
    const timestamp = new Date().toDateString().toString();
    const formattedTimestamp = timestamp?.replace(/\s/g, ''); // Replace spaces with underscores

    const hasPermission = await checkAndRequestPermissions();

    if (!hasPermission) {
      console.warn('Permission denied. Cannot export CSV.');
      return;
    }

    const path =
      RNFS.DownloadDirectoryPath + `/${formattedTimestamp}Auditdata.csv`;

    // Check if the directory exists, create it if necessary
    await RNFS.mkdir(RNFS.DownloadDirectoryPath);

    // Write the CSV string to a file
    await RNFetchBlob.fs.writeFile(path, csvContent, 'utf8');

    const buffer = await RNFetchBlob.fs.readFile(path, 'base64');

    const formData = new FormData();
    formData.append('attachment', {
      uri: `data:text/csv;base64,${buffer}`,
      name: `${formattedTimestamp}Auditdata.csv`,
      type: 'text/csv',
    });
    formData.append('email', 'nikhil@bricshub.com');

    const serverEndpoint = 'https://microservice-kc8d.onrender.com';

    // Send the FormData with fetch
    await RNFetchBlob.fetch(
      'POST',
      `${serverEndpoint}/sendmail`,
      {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      [
        {
          name: 'attachment',
          filename: `${formattedTimestamp}Auditdata.csv`,
          data: buffer,
        },
        {name: 'email', data: 'nikhil@bricshub.com '},
      ],
    )
      .then(({data}) => console.log(data))
      .catch((err: any) => console.log('error : ' + err.message || err));

    console.log('CSV file saved at:', path);
  } catch (error: any) {
    console.error('Error saving CSV file:', error.message || error);
  }
};
