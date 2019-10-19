import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image,
    TouchableNativeFeedback, TextInput, PixelRatio
} from 'react-native';
import CardView from 'react-native-cardview';
import { responsiveFontSize, responsiveHeight, responsiveWidth} from './Helper';

class MainScreen extends Component {

    state = {
        judgeCount: 5,
        totalTime: '90',
        warningTime: '15',
        totalTimeInputError: false,
        warnignTimeInputError: false
    }

    render() {
        return (
            <View style={styles.background}>
                <CardView cardElevation={2} cardMaxElevation={2} cornerRadius={5} style={styles.card}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.heading}>KATA</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={this.state.judgeCount == 5 ? styles.judgeButtonSelected : styles.judgeButton}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={() => { this.setState({ judgeCount: 5 }); }}>
                                <Text style={styles.judgeText}>5 Judges</Text>
                            </TouchableNativeFeedback>
                        </View>
                        <View style={this.state.judgeCount == 7 ? styles.judgeButtonSelected : styles.judgeButton}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={() => { this.setState({ judgeCount: 7 }); }}>
                                <Text style={styles.judgeText}>7 Judges</Text>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={this.startKata}>
                            <View style={styles.startButton}>
                                <Text style={styles.startButtonText}>Start</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </CardView>
                <View style={styles.text}>
                    <Text style={{ fontSize: fontSizes.small }}>Rules Updated 1-9-2019</Text>
                </View>
                <CardView cardElevation={2} cardMaxElevation={2} cornerRadius={5} style={styles.card}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <Text style={styles.heading}>KUMITE</Text>
                    </View>
                    <View style={{ flex: 2, alignItems: 'center', justifyContent: 'space-around' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: fontSizes.small }}>Total Time :   </Text>
                            <TextInput style={this.state.totalTimeInputError ? styles.textInputError : styles.textInput} keyboardType='numeric' onChangeText={(text) => { this.state.totalTime = text; }}>90</TextInput>
                            <Text style={{ fontSize: fontSizes.small }}> Seconds</Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: fontSizes.small }}>Warning Time : </Text>
                            <TextInput style={this.state.warningTimeInputError ? styles.textInputError : styles.textInput} keyboardType='numeric' onChangeText={(text) => { this.state.warningTime = text; }}>15</TextInput>
                            <Text style={{ fontSize: fontSizes.small }}> Seconds</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={this.startKumite}>
                            <View style={styles.startButton}>
                                <Text style={styles.startButtonText}>Start</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </CardView>
                <View style={styles.about}>
                    <View style={{ flex: 1 }}>
                        <Image style={styles.logo} source={require('./images/ledger.jpg')} resizeMode={'contain'} />
                    </View>
                    <View style={{ flex: 2, justifyContent: 'space-around', alignItems: 'center' }}>
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={{ fontSize: fontSizes.small }}>www.ledgererp.com</Text>
                            <Text style={{ fontSize: fontSizes.small }}>7034300879</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={this.aboutPressed}>
                                <View style={styles.aboutButton}>
                                    <Text style={{ color: 'white', fontSize: fontSizes.small }}>About</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Image style={styles.logo} source={require('./images/edkd.jpg')} resizeMode={'contain'} />
                    </View>
                </View>
            </View>
        );
    }

    startKata = () => {
        this.props.navigation.navigate('kataScreen', { judgeSize: this.state.judgeCount });
    }

    startKumite = () => {
        let warningTime = this.state.warningTime;
        let totalTime = this.state.totalTime;
        if (warningTime.length == 0 && totalTime.length == 0)
            this.setState({ warningTimeInputError: true, totalTimeInputError: true });
        else if (warningTime.length == 0)
            this.setState({ warningTimeInputError: true, totalTimeInputError: false });
        else if (totalTime.length == 0)
            this.setState({ warningTimeInputError: false, totalTimeInputError: true });
        else {
            this.setState({ warningTimeInputError: false, totalTimeInputError: false });
            this.props.navigation.navigate('kumiteScreen');
        }
    }

    aboutPressed = () => {
        this.props.navigation.navigate('aboutScreen');
    }
}

const scaleFont = (fontSize) => {
    return fontSize * deviceWidth / baseWidth;
}

const fontSizes = {
    large: responsiveFontSize(3),
    medium: responsiveFontSize(2.5),
    small: responsiveFontSize(1.7)
}

const margins = {
    large: 20,
    medium: 10,
    small: 5
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    card: {
        width: '80%',
        flex: 5,
        marginTop: margins.large,
        marginBottom: margins.large,
        justifyContent: 'space-around'
    },
    text: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    about: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    logo: {
        maxWidth: responsiveHeight(10),
        maxHeight: responsiveHeight(10),
        alignSelf: 'center'
    },
    aboutButton: {
        width: responsiveWidth(15),
        height: responsiveHeight(4),
        backgroundColor: '#1e88e5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: margins.small
    },
    heading: {
        fontSize: fontSizes.large,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#37474f'
    },
    judgeButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'white',
        borderWidth: 2,
        margin: margins.medium,
        borderRadius: margins.medium
    },
    judgeButtonSelected: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#1e88e5',
        borderWidth: 2,
        margin: margins.medium,
        borderRadius: margins.medium
    },
    judgeText: {
        color: '#1e88e5',
        fontWeight: 'bold',
        fontSize: fontSizes.medium,
        padding: margins.large
    },
    startButton: {
        backgroundColor: '#1e88e5',
        alignContent: 'center',
        justifyContent: 'center',
        width: '40%',
        height: responsiveHeight(6),
        borderRadius: margins.small
    },
    startButtonText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontSize: fontSizes.medium,
        fontWeight: 'bold',
    },
    textInput: {
        borderBottomColor: 'grey',
        borderBottomWidth: 2,
        color: 'grey'
    },
    textInputError: {
        borderBottomColor: 'red',
        borderBottomWidth: 2,
        color: 'grey'
    }
});

export default MainScreen;