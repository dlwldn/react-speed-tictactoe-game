import React, { Component } from 'react'
import './style.css'
// 클래스의 경우 -> constructor -> 처음 렌더링 -> ref -> componentDidMount
// -> (setState/props 바뀔때 -> shouldComponentUpdate ->  render -> componentDidUpdate)
// 부모가 나를 없앴을때 -> componentWillUnmount -> 소멸

const rspCoord = {
    바위: 0,
    가위: '-142px',
    보: '-284px'
}

const scores = {
    가위: 1,
    바위: 0,
    보: -1
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoord).find(function (v) {
        return v[1] === imgCoord;
    })[0];
}

export default class App extends Component {
    state = {
        result: '',
        imgCoord: 0,
        score: 0,
    }

    interval;

    // 렌더가 처음 실행되고 다음 이게 실행됨 (리렌더링때는 실행되지않음) - > 비동기요청을 많이함
    componentDidMount() {
        this.interval = setInterval(this.changeHandle, 100)
    }

    // 리렌더링후에 실행
    componentDidUpdate() {

    }

    // 컴포넌트가 제거되기 직전
    // 부모컴포넌트가 나를 없앴을때   -> 비동기 요청 정리
    componentWillUnmount() {
        clearInterval(this.interval);
    }

    changeHandle = () => {
        const { imgCoord } = this.state;
        if (imgCoord === rspCoord.바위) {
            this.setState({
                imgCoord: rspCoord.가위,
            })

        } else if (imgCoord === rspCoord.가위) {
            this.setState({
                imgCoord: rspCoord.보,
            })

        } else if (imgCoord === rspCoord.보) {
            this.setState({
                imgCoord: rspCoord.바위,
            })
        }
    }


    onClickBtn = (choice) => () => {
        const { imgCoord } = this.state;
        clearInterval(this.interval);
        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0) {
            this.setState({
                result: '비겼습니다.',
            })
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다!',
                    score: prevState.score + 1,
                }
            })
        } else {
            this.setState((prevState) => {
                return {
                    result: '졌습니다!',
                    score: prevState.score - 1,
                }
            })
        }

        setTimeout(() => {
            this.interval = setInterval(this.changeHandle, 100);
        }, 2000)
    }


    render() {
        const { result, imgCoord, score } = this.state;

        return (
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
                <div>
                    <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                    <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                    <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                </div>
                <div>{result}</div>
                <div>현재 {score}점</div>
            </>
        )
    }
}
