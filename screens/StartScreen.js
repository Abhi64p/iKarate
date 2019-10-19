import React, { Component } from 'react';
import {
    View, Image, StyleSheet, TextInput, TouchableNativeFeedback,
    Text, Animated, Dimensions, ProgressBarAndroid, BackHandler
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { NavigationEvents } from 'react-navigation';
import DateTime from './DateTime';

class StartScreen extends Component {
    state = {
        slideUpValue: new Animated.Value(0),
        userName: '',
        userPhone: '',
        userNameError: false,
        userPhoneError: false,
        progressVisible: false,
        statusText: 'Ledger ERP © 2019\nwww.ledgererp.com',
        closeApp: false
    }

    startAnimation() {
        Animated.timing(this.state.slideUpValue, { toValue: 1, duration: 350, useNativeDriver: true, delay: 800 }).start();
    };

    render() {
        let startX = Dimensions.get('window').height / 4;

        getData = async () => {
            try {
                isLoggedIn = false;
                const value = await AsyncStorage.getItem('isLoggedIn');
                if (value !== null) {
                    if (value == 'true')
                        isLoggedIn = true;
                }
            }
            catch (e) { }
            if (!isLoggedIn)
                this.startAnimation();
            else
                setTimeout(() => { this.showMainScreen() }, 800);
        }

        getData();

        return (
            <View style={styles.background}>
                <NavigationEvents onWillFocus={this.pageLoaded} />
                <Animated.View style={{
                    transform: [{
                        translateY: this.state.slideUpValue.interpolate({ inputRange: [0, 1], outputRange: [startX, 0] })
                    }],
                    justifyContent: 'space-around',
                    flex: 6
                }}>
                    <Image style={styles.logo} source={require('./images/ledger.jpg')} resizeMode={'contain'} />
                </Animated.View>
                <Animated.View style={[styles.inputGroup, { opacity: this.state.slideUpValue }]}>
                    <TextInput style={[styles.textinput, { borderColor: this.state.userNameError ? 'red' : '#1e88e5' }]} editable={!this.state.progressVisible} placeholder='Enter Name' onChangeText={(text) => this.state.userName = text} />
                    <TextInput style={[styles.textinput, { borderColor: this.state.userPhoneError ? 'red' : '#1e88e5' }]} editable={!this.state.progressVisible} placeholder='Enter Phone No' onChangeText={(text) => { this.state.userPhone = text }} />
                    <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={this.ContinuePressed} disabled={this.state.progressVisible}>
                        <View style={styles.button}>
                            <Text style={styles.text}>Continue</Text>
                        </View>
                    </TouchableNativeFeedback>
                </Animated.View>
                <View style={{ flex: 1 }}>
                    {this.state.progressVisible && <ProgressBarAndroid style={{ height: '80%' }} color='#1e88e' />}
                </View>
                <Text style={styles.status}>{this.state.statusText}</Text>
            </View>
        );
    }

    ContinuePressed = () => {
        let userName = this.state.userName;
        let userPhone = this.state.userPhone;
        let date = this.getDate();
        let time = this.getTime();
        if (userName.length == 0 && userPhone.length == 0)
            this.setState({ userNameError: true, userPhoneError: true });
        else if (userName.length == 0)
            this.setState({ userNameError: true, userPhoneError: false });
        else if (userPhone.length == 0)
            this.setState({ userNameError: false, userPhoneError: true });
        else {
            this.setState({ userNameError: false, userPhoneError: false, progressVisible: true, statusText: 'Please Wait' });
            let result = this.UploadData(userName, userPhone, date, time);

            result.then((success) => {
                if (!success)
                    this.setState({ userNameError: false, userPhoneError: false, progressVisible: false, statusText: 'Couldn\'t connect. Try again!' });
                else {
                    result = this.StoreDate();
                    result.then((success) => {
                        if (!success)
                            this.setState({ userNameError: false, userPhoneError: false, progressVisible: false, statusText: 'Couldn\'t access storage. Try again!' });
                        else
                            this.showMainScreen();
                    });
                }
            });

        }
    }

    async UploadData(userName, userPhone, date, time) {
        try {
            let response = await fetch('http://www.assetsoftwares.org/karate_app_php/AddUser.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: 'name=' + userName + '&phone_no=' + userPhone + '&date=' + date + '&time=' + time
            });
            let returnDate = await response.text();
            if (returnDate == 'Success')
                return Promise.resolve(true);
            else
                return Promise.resolve(false);
        }
        catch (e) {
            return Promise.resolve(false);
        }
    }

    async StoreDate() {
        try {
            await AsyncStorage.setItem('isLoggedIn', 'true');
            return Promise.resolve(true);
        }
        catch (e) {
            console.error(e.message);
            return Promise.resolve(false);
        }
    }

    getTime() {
        let dateTime = new DateTime();
        return dateTime.getTime();
    }

    getDate() {
        let dateTime = new DateTime();
        return dateTime.getDate();
    }

    showMainScreen = () => {
        this.state.closeApp = true;
        this.props.navigation.navigate('mainScreen');
    }

    pageLoaded = () => {
        if (this.state.closeApp)
            BackHandler.exitApp();
    }

}

const styles = StyleSheet.create({
    background: {
        backgroundColor: 'white',
        alignItems: 'center',
        height: '100%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },
    logo: {
        maxHeight: 230,
        minHeight: 230,
        marginTop: 20
    },
    textinput: {
        borderWidth: 2,
        borderRadius: 10,
        textAlign: 'center',
        flex: 1,
        maxHeight: 70,
        minHeight: 70,
        width: '70%',
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e88e5',
        borderRadius: 5,
        flex: 1,
        maxHeight: 60,
        minHeight: 60,
        width: '40%',
    },
    text: {
        color: 'white',
        fontWeight: 'bold'
    },
    progress: {
        position: 'absolute',
        width: '80%',
        maxHeight: 80,
        minHeight: 80,
        alignSelf: 'center'
    },
    status: {
        flex: 1
    },
    inputGroup: {
        flex: 6,
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%'
    }
});

export default StartScreen;