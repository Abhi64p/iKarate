import React, { Component } from 'react';

import { Platform, StyleSheet, View, Text, Modal, Button, TouchableOpacity, Alert } from 'react-native';

class SaveNameAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertVisibility: false
        };
    }

    showAlert() {
        this.setState({ alertVisibility: true });
    }

    dismissAlert() {
        this.setState({ alertVisibility: false });
    }

    okPressed = () => {
        Alert.alert("OK Button Clicked.");
    }

    render() {
        return (
            <View style={styles.MainContainer}>
                <Modal
                    visible={this.state.alertVisibility}
                    transparent={true}
                    animationType={"fade"}
                    onRequestClose={() => { this.dismissAlert(); }} >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <View style={styles.alertMainView}>
                            <Text style={styles.alertTitle}>Custom Alert Dialog Title.</Text>
                            <View style={{ width: '100%', height: 2, backgroundColor: '#fff' }} />
                            <Text style={styles.alertMessage}> Are You Sure(Alert Dialog Message). </Text>
                            <View style={{ width: '100%', height: 1, backgroundColor: '#fff' }} />
                            <View style={{ flexDirection: 'row', height: '30%' }}>
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    onPress={this.okPressed}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.textStyle}> OK </Text>
                                </TouchableOpacity>
                                <View style={{ width: 1, height: '100%', backgroundColor: '#fff' }} />
                                <TouchableOpacity
                                    style={styles.buttonStyle}
                                    onPress={() => { this.showAlert(); }}
                                    activeOpacity={0.7}
                                >
                                    <Text style={styles.textStyle}> CANCEL </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Button onPress={() => { this.showAlert(true) }} title="Click Here To Show Custom Alert Dialog" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: (Platform.OS == 'ios') ? 20 : 0

    },
    alertMainView: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: 200,
        width: '90%',
        borderWidth: 1,
        borderColor: '#fff',
        borderRadius: 7,
    },
    alertTitle: {
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
        padding: 10,
        height: '28%'
    },
    alertMessage: {
        fontSize: 22,
        color: 'black',
        textAlign: 'center',
        padding: 10,
        height: '42%'
    },
    buttonStyle: {
        width: '50%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    textStyle: {
        color: 'black',
        textAlign: 'center',
        fontSize: 22,
        marginTop: -5
    }

});