import * as React from 'react';
import { Appbar, Icon, Card } from 'react-native-paper';
import { Image, StyleSheet, View, TouchableOpacity } from 'react-native';
import ColoredLogo from './ColoredLogo';
import { Colors } from '@/app/constants/colors';

export const Header = ({title, img, secondIcon, onPressProfile}: any) => (
    <Appbar.Header style={styles.body}>
       <Appbar.Content title={title} />
       <View>
        <ColoredLogo style={{flexDirection: 'flex-start'}}/>
       </View>
       <TouchableOpacity onPress={onPressProfile} style={{marginLeft: 200, marginRight: 10}}>
       <Card.Cover source={img} style={{width: 35, height: 35}}/>
       </TouchableOpacity>
       <View style={{marginRight: 25}}>
       <Icon size={30} source={secondIcon}/>
       </View>
    </Appbar.Header>
);

export const HeaderWithText = ({title, icon, onChange}: any) => (
   <Appbar.Header style={[styles.body]}>
     <Appbar.BackAction onPress={onChange} />
     <Appbar.Content style={{marginRight: 150}} title={title} />
     <Appbar.Action icon={icon} />
   </Appbar.Header>
);

const styles = StyleSheet.create({
   body: {
    backgroundColor: Colors.main.lightBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    display: 'flex',
    width: 'auto',
   }
});