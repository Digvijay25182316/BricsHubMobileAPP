import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import * as Progress from 'react-native-progress';

const ProgressAudit = ({
  PlotId,
  ProjectId,
  Latitude,
  Longitude,
  AuditId,
}: {
  PlotId: string | undefined;
  ProjectId: string | undefined;
  Latitude: string | undefined;
  Longitude: string | undefined;
  AuditId: string | undefined;
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progress = [PlotId, ProjectId, Latitude, Longitude, AuditId];
    let undefined = progress.filter(item => item !== '' || null).length;
    const countProgressAvg = 1 / progress.length;

    setProgress(countProgressAvg * undefined);
  }, [PlotId, ProjectId, Latitude, Longitude, AuditId]);

  return (
    <View>
      <Progress.Bar
        progress={progress}
        width={useWindowDimensions().width}
        color="rgb(161 98 7)"
      />
    </View>
  );
};

export default ProgressAudit;

const styles = StyleSheet.create({});
