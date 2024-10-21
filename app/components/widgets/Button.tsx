import { Colors } from '@/app/constants/colors';
import * as React from 'react';
import { Pressable } from 'react-native';
import { Button } from 'react-native-paper';


export function MyButton({icon,text,textColor,color,onChange,size}:any) {
    return (
        <Pressable>
            <Button style={{borderRadius:0,backgroundColor:color,width:size,borderColor:color,marginBottom:20}}
                theme={{colors: { primary:textColor } }}
                icon={icon} mode="outlined" onPress={onChange}>
                {text}
            </Button>
        </Pressable>
        
    )
}

export function ButtonText({ text, textColor, color, onChange }:any) {
    return (
      <Pressable>
        <Button
          style={{ backgroundColor: color, width: 300, borderColor: color, marginBottom: 20 }}
          icon=""
          mode="contained"
          onPress={onChange}
          labelStyle={{ color: textColor }} 
        >
          {text}
        </Button>
      </Pressable>
    );
  }
