import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity, TouchableWithoutFeedbackComponent } from 'react-native';
import CardView from 'react-native-cardview';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from './Helper';

class AddMarkScreen extends Component {

    state = {
        judgeCount: 1,
        judgeSize: 5,
        judge: [],
        markError: false
    }

    constructor(props) {
        super(props);
        this.state.judgeCount = parseInt(this.props.navigation.getParam('judgeCount', '1'), 10);
        this.state.judgeSize = parseInt(this.props.navigation.getParam('judgeSize', '5'), 10);
        this.state.judge = this.props.navigation.getParam('judge', []);
    }

    render() {
        let judgeCount = this.state.judgeCount;
        let judge = this.state.judge;
        return (
            <View style={{ flex: 1 }}>
                <CardView cardElevation={2} cardMaxElevation={2} style={styles.topBar}>
                    <TouchableWithoutFeedback onPress={this.backPressed}>
                        <Image source={require('./images/back.png')} style={styles.backImage}></Image>
                    </TouchableWithoutFeedback>
                    <Text style={styles.title}>{'Add Mark - Judge ' + judgeCount}</Text>
                </CardView>
                <View style={{ margin: 10, flex: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                        <Text style={styles.heading}>Technical</Text>
                        <Text style={styles.heading}>Athletic</Text>
                    </View>
                    <View style={{ flex: 5}}>
                        <View style={styles.row}>
                            <View style={styles.innerRowLeft}>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(0, 5); }}>
                                    <Text style={judge[judgeCount - 1][0] === 5 ? styles.selectedText : styles.liteBlueText}>5</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(1, 0); }}>
                                    <Text style={judge[judgeCount - 1][1] === 0 ? styles.selectedText : styles.liteBlueText}>0</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.innerRowRight}>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(2, 5); }}>
                                    <Text style={judge[judgeCount - 1][2] === 5 ? styles.selectedText : styles.liteRedText}>5</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(3, 0); }}>
                                    <Text style={judge[judgeCount - 1][3] === 0 ? styles.selectedText : styles.liteRedText}>0</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.innerRowLeft}>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(0, 6); }}>
                                    <Text style={judge[judgeCount - 1][0] === 6 ? styles.selectedText : styles.darkBlueText}>6</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(1, 2); }}>
                                    <Text style={judge[judgeCount - 1][1] === 2 ? styles.selectedText : styles.darkBlueText}>2</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.innerRowRight}>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(2, 6); }}>
                                    <Text style={judge[judgeCount - 1][2] === 6 ? styles.selectedText : styles.darkRedText}>6</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(3, 2); }}>
                                    <Text style={judge[judgeCount - 1][3] === 2 ? styles.selectedText : styles.darkRedText}>2</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.innerRowLeft}>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(0, 7); }}>
                                    <Text style={judge[judgeCount - 1][0] === 7 ? styles.selectedText : styles.liteBlueText}>7</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(1, 4); }}>
                                    <Text style={judge[judgeCount - 1][1] === 4 ? styles.selectedText : styles.liteBlueText}>4</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.innerRowRight}>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(2, 7); }}>
                                    <Text style={judge[judgeCount - 1][2] === 7 ? styles.selectedText : styles.liteRedText}>7</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(3, 4); }}>
                                    <Text style={judge[judgeCount - 1][3] === 4 ? styles.selectedText : styles.liteRedText}>4</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.innerRowLeft}>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(0, 8); }}>
                                    <Text style={judge[judgeCount - 1][0] === 8 ? styles.selectedText : styles.darkBlueText}>8</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(1, 6); }}>
                                    <Text style={judge[judgeCount - 1][1] === 6 ? styles.selectedText : styles.darkBlueText}>6</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.innerRowRight}>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(2, 8); }}>
                                    <Text style={judge[judgeCount - 1][2] === 8 ? styles.selectedText : styles.darkRedText}>8</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(3, 6); }}>
                                    <Text style={judge[judgeCount - 1][3] === 6 ? styles.selectedText : styles.darkRedText}>6</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <View style={styles.innerRowLeft}>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(0, 9); }}>
                                    <Text style={judge[judgeCount - 1][0] === 9 ? styles.selectedText : styles.liteBlueText}>9</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(1, 8); }}>
                                    <Text style={judge[judgeCount - 1][1] === 8 ? styles.selectedText : styles.liteBlueText}>8</Text>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={styles.innerRowRight}>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(2, 9); }}>
                                    <Text style={judge[judgeCount - 1][2] === 9 ? styles.selectedText : styles.liteRedText}>9</Text>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { this.scoreBoxPressed(3, 8); }}>
                                    <Text style={judge[judgeCount - 1][3] === 8 ? styles.selectedText : styles.liteRedText}>8</Text>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}} onPress={this.nextJudgePressed}>
                        <Text
                            style={{
                                fontSize: fontSizes.medium, fontWeight: 'bold', width: '70%', height: '70%', backgroundColor: '#1e88e5',
                                textAlign: 'center', textAlignVertical: 'center', color: 'white', borderRadius: 5
                            }}>
                            {judgeCount == this.state.judgeSize ? 'Finish' : 'Next - Judge ' + (judgeCount + 1)}
                        </Text>
                    </TouchableOpacity>
                    <View style={{alignItems: 'center', justifyContent: 'center', height: responsiveHeight(4)}}>
                        {this.state.markError && <Text style={{ color: 'red', fontSize: fontSizes.small }}>Select mark from each column!</Text>}
                    </View>
                </View>
            </View>
        );
    }

    backPressed = () => {
        this.props.navigation.goBack();
    }

    scoreBoxPressed = (positon, value) => {
        let judge = this.state.judge;
        judge[this.state.judgeCount - 1][positon] = value;
        this.setState({ judge: judge });
    }

    nextJudgePressed = () => {
        let innerScore = this.state.judge[this.state.judgeCount-1];
        let showNextJudge = true;
        for (i = 0; i < 4; i++)
            if (innerScore[i] === ' ') {
                showNextJudge = false;
                break;
            }

        if (showNextJudge) {
            this.props.navigation.state.params.updateData(this.state.judge);
            if (this.state.judgeCount == this.state.judgeSize)
                this.props.navigation.goBack();
            else
                this.setState({
                    judgeCount: this.state.judgeCount + 1,
                    markError: false
                });
        }
        else
            this.setState({ markError: true });
    }
}

const fontSizes = {
    large: responsiveFontSize(3),
    medium: responsiveFontSize(2.5),
    small: responsiveFontSize(2)
}

const boxWidth = responsiveWidth(15);
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
    heading: {
        flex: 1,
        textAlign: 'center',
        fontSize: fontSizes.medium
    },
    row: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 10
    },
    innerRowLeft: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 20
    },
    innerRowRight: {
        flex: 1,
        flexDirection: 'row',
        height: '100%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: 20
    },
    liteBlueText: {
        fontSize: fontSizes.medium,
        backgroundColor: '#90caf9',
        width: boxWidth,
        height: boxWidth,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    darkBlueText: {
        fontSize: fontSizes.medium,
        backgroundColor: '#64b5f6',
        width: boxWidth,
        height: boxWidth,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    liteRedText: {
        fontSize: fontSizes.medium,
        backgroundColor: '#ef9a9a',
        width: boxWidth,
        height: boxWidth,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    darkRedText: {
        fontSize: fontSizes.medium,
        backgroundColor: '#e57373',
        width: boxWidth,
        height: boxWidth,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginLeft: 5,
        marginRight: 5
    },
    selectedText: {
        fontSize: fontSizes.medium,
        backgroundColor: 'white',
        width: boxWidth,
        height: boxWidth,
        textAlign: 'center',
        textAlignVertical: 'center',
        marginLeft: 5,
        marginRight: 5,
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 5
    }
});

export default AddMarkScreen;