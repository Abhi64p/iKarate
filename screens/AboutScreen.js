import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import CardView from 'react-native-cardview';
import { responsiveFontSize, responsiveWidth } from './Helper';

class KataScreen extends Component {

    render() {
        return (
            <View style={{ flex: 1 }}>
                <CardView cardElevation={2} cardMaxElevation={2} style={styles.topBar}>
                    <TouchableWithoutFeedback onPress={this.backPressed}>
                        <Image source={require('./images/back.png')} style={styles.backImage}></Image>
                    </TouchableWithoutFeedback>
                    <Text style={styles.title}>About</Text>
                </CardView>
                <View style={{ margin: 10, flex: 10, alignItems: 'center', justifyContent: 'space-around' }}>
                    <Text style={styles.text}>Special Thanks To</Text>
                    <Image source={require('./images/edkd.jpg')} resizeMode='contain' style={styles.logo} />
                    <Text style={styles.text}>Powered By</Text>
                    <Image source={require('./images/ledger.jpg')} resizeMode='contain' style={styles.logo} />
                    <View style={{ alignItems: 'center', flex: 1, justifyContent: 'flex-end', marginTop: 10}}>
                        <Text style={{fontSize:fontSizes.small}}>Janesh James</Text>
                        <Text style={{fontSize:fontSizes.small}}>7034300879</Text>
                    </View>
                    <Text style={styles.text}>www.ledgererp.com</Text>
                </View>
            </View>
        );
    }

    backPressed = () => {
        this.props.navigation.goBack();
    }

}

const fontSizes = {
    large : responsiveFontSize(3.5),
    medium: responsiveFontSize(2.5),
    small : responsiveFontSize(2)
}

const box = responsiveWidth(6);

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
        height: box,
        width: box

    },
    text: {
        flex: 1,
        textAlignVertical: 'bottom',
        paddingBottom: 10,
        fontSize: fontSizes.medium
    },
    logo: {
        flex: 5
    }
});

export default KataScreen;