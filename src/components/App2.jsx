import React, { useState, useRef } from 'react'
import './style.css'

const App2 = () => {
    const [state, setState] = useState('waiting');
    const [message, setMessage] = useState('클릭해서 시작하세요');
    const [result, setResult] = useState([]);
    const timeOut = useRef(null);
    const startTime = useRef();
    const endTime = useRef();

    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요')
            timeOut.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭');
                startTime.current = new Date();
            }, Math.floor(Math.random() * 1000) + 2000); // 2000 ~ 3000 랜덤

        } else if (state === 'ready') { //성급하게 클릭
            clearTimeout(timeOut.current);
            setState('waiting');
            setMessage('성급하시군요 초록색이 된 후에 클릭하세요')

        } else if (state === 'now') { //반응속도 체크
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요');
            setResult((prevResult) => {
                return [...prevResult, endTime.current - startTime.current]
            })
        }
    }

    const renderAverage = () => {
        return result.length === 0
            ? null
            : <div>평균시간 : {result.reduce((a, c) => a + c) / result.length}ms
            <button onClick={() => { setResult([]) }}>리셋</button>
            </div>
    }


    return (
        <>
            <div id="screen" className={state} onClick={onClickScreen}>
                {message}
            </div>
            {renderAverage()}
        </>
    )
}

export default App2;




// export default class App extends Component {
//     state = {
//         state: 'waiting',
//         message: '클릭해서 시작하세요',
//         result: [],
//     }

//     timeout;
//     startTime;
//     endTime;

//     onClickScreen = () => {
//         const { state } = this.state;
//         if (state === 'waiting') {
//             this.setState({
//                 state: 'ready',
//                 message: '초록색이 되면 클릭하세요',
//             });
//             this.timeout = setTimeout(() => {
//                 this.setState({
//                     state: 'now',
//                     message: '지금 클릭',
//                 })
//                 this.startTime = new Date();
//             }, Math.floor(Math.random() * 1000) + 2000); // 2000 ~ 3000 랜덤
//         } else if (state === 'ready') { //성급하게 클릭
//             clearTimeout(this.timeout);
//             this.setState({
//                 state: 'waiting',
//                 message: '성급하시군요 초록색이 된 후에 클릭하세요',
//             })
//         } else if (state === 'now') { //반응속도 체크
//             this.endTime = new Date();
//             this.setState((prevState) => {
//                 return {
//                     state: 'waiting',
//                     result: [...prevState.result, this.endTime - this.startTime],
//                     message: '클릭해서 시작하세요.',
//                 }
//             })
//         }
//     }

//     renderAverage = () => {
//         const { result } = this.state;
//         return result.length === 0
//             ? null
//             : <div>평균시간 : {result.reduce((a, c) => a + c) / result.length}ms
//             <button onClick={() => { this.setState({ result: [] }) }}>리셋</button>
//             </div>
//     }


//     render() {
//         const { state, message } = this.state;
//         return (
//             <>
//                 <div id="screen" className={state} onClick={this.onClickScreen}>
//                     {message}
//                 </div>
//                 {this.renderAverage()}
//             </>
//         )
//     }
// }
