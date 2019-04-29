import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Pill from '../../atoms/Pill/Pill';
import RunStatus from '../../atoms/RunStatus/RunStatus';

import chartThumb from '../../../assets/images/chart-thumb.png';
import optionsIcon from '../../../assets/images/ico-options.svg';

import styles from './BotCard.module.scss';
import Info from '../../atoms/Info/Info';
import Badge from '../../atoms/Badge/Badge';
import PillGroup from '../PillGroup/PillGroup';
import StartStop from '../../atoms/StartStop/StartStop';


class BotCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeStarted: null,
      timeElapsed: null,
      isRunning: false,
    };
    this.toggleBot = this.toggleBot.bind(this);
  }


  static defaultProps = {
    name: '',
    test: true,
    warnings: 0,
    errors: 0, 
  }

  static propTypes = {
    name: PropTypes.string,
    test: PropTypes.bool,
    warnings: PropTypes.number,
    errors: PropTypes.number, 
  };

  toggleBot() {
    if(this.state.isRunning){
      this.stopBot();
    }
    else {
      this.startBot();
    }
  }

  startBot(){
    this.setState({
      timeStarted: new Date(),
      isRunning: true,
    }, () => {
      this.tick();
    
      this.timer = setInterval(
        () => this.tick(),
        1000
      );
    });
  }

  stopBot() {
    this.setState({
      timeStarted: null,
      timeElapsed: null,
      isRunning: false,
    });
    clearTimeout(this.timer);
  }

  tick() {
    let timeNow = new Date();
    let diffTime = timeNow - this.state.timeStarted;
    
    let elapsed = new Date(diffTime);
    
    this.setState({
      timeElapsed: elapsed,
    });
  }

  render() {
    return (
      <div className={styles.card}>
        <span className={this.state.isRunning ? styles.statusRunning : styles.statusStopped}></span>
        <button className={styles.optionsMenu}><img src={optionsIcon}/></button>
        <div className={styles.firstColumn}>
          <h2 className={styles.title}>{this.props.name}</h2>
          <div className={styles.botDetailsLine}>
            <Badge test={this.props.test}/>
            <span className={styles.exchange}>SDEX </span>
            <span className={styles.lightText}> buysell</span>
          </div>
          <div>
            <div className={styles.baseAssetLine}>
              <span className={styles.textMono}>XLM </span>
              <span className={styles.textMono}> 5,001.56</span>
            </div>
            <div className={styles.quoteAssetLine}>
              <span className={styles.textMono}>USD </span>
              <Info/>
              <span className={styles.textMono}> 5,001.56</span>
            </div>
          </div>
        </div>

        <div className={styles.secondColumn}>
          <div className={styles.notificationsLine}>
            <PillGroup>
              <Pill number={this.props.warnings} type={'warning'}/>
              <Pill number={this.props.errors} type={'error'}/>
            </PillGroup>
          </div>
          <div className={styles.spreadLine}>
            <span className={styles.lightText}>Spread </span>
            <span className={styles.textMono}> $0.0014 (0.32%)</span>
          </div>
          <div className={styles.bidsLine}>
            <span className={styles.textMono}>5 </span>
            <span className={styles.textMono}> bids</span>
          </div>
          <div className={styles.asksLine}>
            <span className={styles.textMono}>3 </span>
            <span className={styles.textMono}> asks</span>
          </div>
        </div>

        <div className={styles.thirdColumn}>
          <img className={styles.chartThumb} src={chartThumb} alt="chartThumb"/>
        </div>

        <div className={styles.fourthColumn}>
          <RunStatus className={styles.statusDetails} timeRunning={this.state.timeElapsed}/>
          <StartStop onClick={this.toggleBot} isRunning={this.state.isRunning}/>
        </div>

      </div>
    );
  }
}

export default BotCard;