import React, { Component } from 'react';
import Try from './Try'

function getNumbers() {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  console.log(array);
  return array;
}


class App extends Component {
  state = {
    value: '',
    result: '',
    answer: getNumbers(),
    tries: [],
  }

  onSubmitHandler = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join('')) {
      this.setState({
        result: '홈런',
        tries: [...this.state.tries, { try: this.state.value, result: "홈런 !" }]
      })
      alert('게임을 다시 시작합니다!');
      this.setState({
        value: '',
        answer: getNumbers(),
        tries: [],
      })

    } else {
      const answerArray = this.state.value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(',')} 였습니다.`,
        });
        alert('게임을 다시 시작합니다!');
        this.setState({
          value: '',
          answer: getNumbers(),
          tries: [],
        })
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState({
          tries: [...this.state.tries, { try: this.state.value, result: `${strike} 스트라이크, ${ball} 볼입니다.` }],
          value: '',
        })
      }
    }
  }


  onChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  fruits = [
    { name: "사과", taste: "맛없다" },
    { name: "귤", taste: "맛있다" },
    { name: "배", taste: "맛없다" },
    { name: "조", taste: "중간" },
    { name: "사", taste: "맛없다" },
  ]

  render() {
    return (
      <div >
        <h1>{this.state.result}</h1>
        <form action="" onSubmit={this.onSubmitHandler}>
          <input type="text" name="value" value={this.state.value} onChange={this.onChangeHandler} />
          <button type="submit">입력</button>
        </form>
        <div>횟수: {this.state.tries.length}</div>
        <ul>
          {this.state.tries.map((fruit, index) => {
            return <Try key={index} fruit={fruit} />
          })}
        </ul>
      </div>
    );
  }

}

export default App;
