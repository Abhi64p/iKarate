import React, { Component } from 'react';
import {
    View, Text, StyleSheet, Image, TouchableWithoutFeedback,
    TouchableNativeFeedback, Modal, TouchableOpacity, TextInput
} from 'react-native';
import CardView from 'react-native-cardview';
import Database from './Database';
import DateTime from './DateTime';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from './Helper';

class KataScreen extends Component {

    state = {
        finalScore: '0.0',
        judgeSize: 5,
        alertVisibility: true,
        studentName: '',
        studentNameError: false,
        judge: []
    }

    constructor(props) {
        super(props)
        this.state.judgeSize = parseInt(this.props.navigation.getParam('judgeSize', '5'));
        for (i = 0; i < this.state.judgeSize; i++)
            this.state.judge.push([' ', ' ', ' ', ' ']);
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <CardView cardElevation={2} cardMaxElevation={2} style={styles.topBar} opacity={this.state.alertVisibility ? 0.3 : 1.0}>
                    <TouchableWithoutFeedback onPress={this.backPressed}>
                        <Image source={require('./images/back.png')} style={styles.backImage}></Image>
                    </TouchableWithoutFeedback>
                    <Text style={styles.title}>Kata</Text>
                    <View style={{ position: 'absolute', right: 10 }}>
                        <TouchableNativeFeedback style={{ alignSelf: 'flex-end' }} onPress={this.historyPressed}>
                            <View style={styles.historyButton}>
                                <Text style={{ color: 'white', fontSize: fontSizes.small }}>History</Text>
                            </View>
                        </TouchableNativeFeedback>
                    </View>
                </CardView>
                <View style={{ margin: 10, flex: 10, alignItems: 'center' }} opacity={this.state.alertVisibility ? 0.3 : 1.0}>
                    <View style={{ flex: 2, width: '100%' }}>
                        <Text style={{ textAlign: 'left', marginLeft: 20, fontSize: fontSizes.small }}>
                            {'Student Name/ID : ' + (this.state.studentName.length == 0 ? 'Empty' : this.state.studentName)}
                        </Text>
                        <View style={{ width: responsiveWidth(30), height: responsiveHeight(10), alignSelf: 'center', marginTop: 10 }}>
                            <CardView cardElevation={2} cardMaxElevation={2}>
                                <View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', backgroundColor: '#eeeeee' }}>
                                    <Text style={{ textAlign: 'center', fontSize: fontSizes.medium, fontWeight: 'bold' }}>{'Score\n' + this.state.finalScore}</Text>
                                </View>
                            </CardView>
                        </View>
                    </View>
                    <View style={{ flex: 8, justifyContent: 'space-around', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, height: '100%' }}>
                            <Text style={styles.heading}>Technical</Text>
                            <Text style={styles.heading}>Athletic</Text>
                        </View>
                        <View style={{ flex: 7, justifyContent: 'flex-start' }}>
                            {
                                this.state.judge.map((item, key) => (
                                    <TouchableWithoutFeedback onPress={() => { this.scoreRowPressed(key + 1); }} key={key}>
                                        <View style={styles.row}>
                                            <Text style={styles.scoreBoxLeft}>{item[0]}</Text>
                                            <Text style={styles.scoreBoxLeft}>{item[1]}</Text>
                                            <Text style={{ fontSize: fontSizes.small }}>{'Judge ' + (key + 1)}</Text>
                                            <Text style={styles.scoreBoxRight}>{item[2]}</Text>
                                            <Text style={styles.scoreBoxRight}>{item[3]}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                ))
                            }
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center' }}>
                            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={this.newMatch}>
                                <View style={{ backgroundColor: '#1e88e5', alignItems: 'center', justifyContent: 'center', minWidth: responsiveWidth(45), borderRadius: 5 }}>
                                    <Text style={{ fontSize: fontSizes.medium, fontWeight: 'bold', color: 'white', height: 50, textAlignVertical: 'center' }}>New Match</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                    </View>
                </View>

                <Modal
                    visible={this.state.alertVisibility}
                    transparent={true}
                    animationType={"fade"}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                        <CardView cardElevation={10} cardMaxElevation={2} style={{ height: 200, width: '80%' }}>
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
                                <Text style={{ flex: 1, textAlignVertical: 'center', fontSize: fontSizes.medium }}>Enter student name or ID</Text>
                                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                                    <TextInput
                                        style={{
                                            borderColor: this.state.studentNameError ? 'red' : '#1e88e5', borderWidth: 2,
                                            borderRadius: 5, width: '80%', height: 50, textAlign: 'center', fontSize: 18
                                        }}
                                        placeholder='Name or ID'
                                        onChangeText={(text) => { this.state.studentName = text; }}
                                        defaultValue={this.state.studentName}
                                    />
                                </View>
                                <TouchableOpacity style={{ flex: 1, justifyContent: 'center' }} onPress={this.alertSavePressed}>
                                    <Text style={{ color: '#1e88e5', fontSize: fontSizes.medium, fontWeight: 'bold' }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        </CardView>
                    </View>
                </Modal>

            </View>
        );
    }

    backPressed = () => {
        this.props.navigation.goBack();
    }

    historyPressed = () => {
        this.props.navigation.navigate('historyScreen');
    }

    newMatch = () => {
        let dateTime = new DateTime();
        let db = new Database();
        let judgeScore = '';

        let size = this.state.judge.length;
        for (i = 0; i < size; i++)
            judgeScore += this.state.judge[i][0] + '.' + this.state.judge[i][1] + ',' + this.state.judge[i][2] + '.' + this.state.judge[i][3] + ';';
        let mark = {
            name: this.state.studentName,
            judgeScore: judgeScore,
            finalScore: this.state.finalScore,
            date: dateTime.getDate(),
            time: dateTime.getTime()
        }

        db.addMark(mark);

        this.state.judge = [];
        for (i = 0; i < this.state.judgeSize; i++)
            this.state.judge.push([' ', ' ', ' ', ' ']);
        this.state.studentName = '';
        this.state.finalScore = '0.0';

        this.setState({ alertVisibility: true });
    }

    scoreRowPressed = (judgeCount) => {
        this.props.navigation.navigate('addMarkScreen', {
            judgeCount: judgeCount,
            judgeSize: this.state.judgeSize,
            judge: this.state.judge,
            updateData: this.updateData
        });
    }

    showAlert = () => {
        this.setState({ alertVisibility: true });
    }

    alertSavePressed = () => {
        let studentName = this.state.studentName;
        if (studentName.length == 0)
            this.setState({ studentNameError: true });
        else
            this.setState({ studentNameError: false, alertVisibility: false });
    }

    updateData = (judge) => {
        let calculate = true;
        let size = judge.length;
        for (i = 0; i < size; i++) {
            for (j = 0; j < 4; j++)
                if (judge[i][j] === ' ') {
                    calculate = false;
                    break;
                }
            if (!calculate)
                break;
        }

        if (calculate) {
            let technicalMarkArr = [];
            let athleticMarkArr = [];

            for (i = 0; i < this.state.judgeSize; i++) {
                let mark = judge[i][0];
                mark += judge[i][1] / 10;
                technicalMarkArr.push(mark);

                mark = judge[i][2];
                mark += judge[i][3] / 10;
                athleticMarkArr.push(mark);
            }

            this.removeSmallest(technicalMarkArr);
            this.removeSmallest(athleticMarkArr);
            this.removeLargest(technicalMarkArr);
            this.removeLargest(athleticMarkArr);
            if (this.state.judgeSize == 7) {
                this.removeSmallest(technicalMarkArr);
                this.removeSmallest(athleticMarkArr);
                this.removeLargest(technicalMarkArr);
                this.removeLargest(athleticMarkArr);
            }

            let technicalSum = 0;
            let athleticSum = 0;
            for (i = 0; i < 3; i++) {
                technicalSum += technicalMarkArr[i];
                athleticSum += athleticMarkArr[i];
            }

            let total = technicalSum * 0.7 + athleticSum * 0.3;
            this.setState({ finalScore: total.toFixed(2) });
        }
        else
            this.setState({ jude: judge });
    }

    removeSmallest(arr) {
        let size = arr.length;
        let index = 0;
        let smallest = arr[0];
        for (i = 1; i < size; i++)
            if (arr[i] < smallest) {
                smallest = arr[i];
                index = i;
            }
        arr.splice(index, 1);
    }

    removeLargest(arr) {
        let size = arr.length;
        let index = 0;
        let largest = arr[0];
        for (i = 1; i < size; i++)
            if (arr[i] > largest) {
                largest = arr[i];
                index = i;
            }
        arr.splice(index, 1);
    }
}

const fontSizes = {
    large: responsiveFontSize(3),
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
        width: responsiveWidth(18),
        height: responsiveHeight(5),
        backgroundColor: '#1e88e5',
        alignItems: 'center',
        alignSelf: 'flex-start',
        justifyContent: 'center',
        borderRadius: 5
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '100%',
        flex: 1
    },
    scoreBoxLeft: {
        textAlign: 'center',
        textAlignVertical: 'center',
        width: responsiveWidth(15),
        height: '80%',
        backgroundColor: '#f44336',
        fontSize: fontSizes.medium,
        color: 'white'
    },
    scoreBoxRight: {
        textAlign: 'center',
        textAlignVertical: 'center',
        width: responsiveWidth(15),
        height: '80%',
        backgroundColor: '#2196f3',
        fontSize: fontSizes.small,
        color: 'white'
    },
    heading: {
        flex: 1,
        textAlign: 'center',
        fontSize: fontSizes.medium
    }
});

export default KataScreen;