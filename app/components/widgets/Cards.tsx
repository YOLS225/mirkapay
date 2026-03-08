import * as React from 'react';
import { Avatar, Card, Icon, TextInput } from 'react-native-paper';
import { StyleSheet, View, Text, TouchableOpacity, Pressable, Image } from "react-native";
import { MyButton } from './Button';
import { Colors } from '@/app/constants/colors';
import { PaymentLogo } from './PaymentLogo';


export const Input = ({text, color, textColor, value, onChangeText, keyboardType}: any) => {
  return (
    <TextInput
    style={{backgroundColor: color, width: '100%', height: 60, marginBottom: 25}}
    theme={{colors: { primary: textColor } }}
      mode="outlined"
      label={text}
      placeholder={text}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
    />
  );
};


export const SecureInput = ({text, color, textColor, value, onChangeText}: any) => {
    return (
      <TextInput
      secureTextEntry
      style={{backgroundColor: color, width: '100%', height: 60, marginBottom: 25}}
      theme={{colors: { primary: textColor } }}
        mode="outlined"
        label={text}
        placeholder={text}
        value={value}
        onChangeText={onChangeText}
      />
    );
  };


  export const CardInfo = ({title, content, color, top}: any) => (
  <Card style={{backgroundColor: color, borderRadius: 0, borderColor: color, marginTop: top, width: '100%'}}>
    <Card.Content>
      <Text>{title}</Text>
      <Text style={{textAlign: 'center'}}>{content}</Text>
    </Card.Content>
  </Card>
);


export const PayCard = ({title, titleColor, content, buttonText, textColor, color, onChange, icon, buttonSize, top}: any) => (
  <Card style={{borderRadius: 0, borderColor: color, width: '100%', marginTop: top}}>
      <Text style={{marginTop: 15, marginLeft: 10, marginBottom: 20, color: titleColor}}>{title}</Text>
    <Card.Content style={{flexDirection: 'row', justifyContent: 'space-between', width: 'auto'}}>
      <Text style={{fontSize: 30, fontWeight: 'bold'}}>{content}</Text>
      <MyButton
                    style={{fontWeight: 'bold'}}
                    textColor={textColor}
                    text={buttonText}
                    icon={icon}
                    color={color}
                    size={buttonSize}
                    onChange={onChange}/>
    </Card.Content>
  </Card>
);

export const CardDetail = ({title, sub, icon, color, amount, month, top}: any) => (
  <Card.Title style={{backgroundColor: color, marginTop: top, marginBottom: 5}}
    title={title}
    subtitle={sub}
    left={(props) => <Avatar.Icon {...props} icon={icon} />}
     right={() =>
      <>
     <Text style={{marginBottom: 15, color: Colors.main.lightRed}}>{amount}</Text>
     <Text>{month}</Text>
     </>
    }
  />
);

export const CardGeneral = () => (
    <Card style={{backgroundColor: Colors.main.CloudGrey, marginTop: 5, marginBottom: 5, borderRadius: 0}}>
            <Card.Content>
                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15}}>
                  <Text>Type de cotisation :</Text>
                  <Text style={{justifyContent: 'flex-end'}}>Cotisations</Text>
                 </View>
                 <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15}}>
                    <Text>Périodes :</Text>
                    <Text style={{justifyContent: 'flex-end'}}>Mars - Août</Text>
                 </View>
                 <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15}}>
                    <Text>Nombre de personnes :</Text>
                    <Text style={{justifyContent: 'flex-end'}}>04 Personnes</Text>
                 </View>
                 <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15}}>
                   <Text>Montant mensuel :</Text>
                   <Text style={{justifyContent: 'flex-end'}}>4 000 FCFA</Text>
                 </View>
                 <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15}}>
                 <Text>Montant Total :</Text>
                 <Text style={{justifyContent: 'flex-end', color: Colors.main.green}}>12 000 FCFA</Text>
                 </View>
                </Card.Content>
        </Card>
    );


    export const CardMethod = ({title, sub, img, color, top, icon, onChange}: any) => (
      <Pressable onPress={onChange}>
      <Card.Title style={{backgroundColor: color, marginTop: top, marginBottom: 5}}
        title={title}
        subtitle={sub}
        left={(props) => <Card.Cover {...props} source={img} style={{width: 50, height: 50}}/>}
         right={(props) => <Icon {...props} source={icon} size={25}/>}
      />
      </Pressable>
    );