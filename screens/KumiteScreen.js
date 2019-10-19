import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import CardView from 'react-native-cardview';
import { responsiveFontSize, responsiveWidth } from './Helper';

class KataScreen extends Component {

    render() {
        //let judgeCount = this.props.navigation.getParam('judgeCount', '5');
        return (
            <View style={{ flex: 1 }}>
                <CardView cardElevation={2} cardMaxElevation={2} style={styles.topBar}>
                    <TouchableWithoutFeedback onPress={this.backPressed}>
                        <Image source={require('./images/back.png')} style={styles.backImage}></Image>
                    </TouchableWithoutFeedback>
                    <Text style={styles.title}>Kumite</Text>
                </CardView>
                <View style={{ borderColor: 'black', borderWidth: 2, margin: 10, flex: 10 }}>
                </View>
            </View>
        );
    }

    backPressed = () => {
        this.props.navigation.goBack();
    }

}

const fontSizes = {
    large: responsiveFontSize(3.5),
    medium: responsiveFontSize(2.5),
    small: responsiveFontSize(2)
}

const backBox = responsiveWidth(6);

const styles = StyleSheet.create({
    topBar: {
        width: '100%',
        height: 50,
        maxHeight: 50,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    title: {
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        color: '#37474f'
    },
    backImage: {
        marginLeft: 10,
        marginRight: 10,
        width: backBox,
        height: backBox
    },
    historyButton: {
        width: 80,
        height: 35,
        backgroundColor: '#1e88e5',
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        borderRadius: 5
    }
});

export default KataScreen;