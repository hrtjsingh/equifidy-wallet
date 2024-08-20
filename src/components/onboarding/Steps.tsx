import React from 'react'
import styles from './StepIndicator.module.css';
const StepIndicator = ({ steps = Array.from({ length: 5 }), currentStep, navigator }: any) => {
    return (
        <div className={styles.stepContainer}>
            {steps.map((step: any, index: any) => {
                let statusClass = styles.next;

                if (index < currentStep) {
                    statusClass = styles.completed;
                } else if (index === currentStep) {
                    statusClass = styles.current;
                }

                return (
                    <div key={index} className={`${styles.step} ${statusClass}`} >
                        <span className={styles.bullet} onClick={() => navigator(index)}></span>
                    </div>
                );
            })}
        </div>
    );
};


export default StepIndicator