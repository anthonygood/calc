import React from 'react'

const Inputs = ({ amount, duration, onChange }) =>
  <form>
    <div>
      <label html="amount">Amount (in £)</label>
      <input
        name="amount"
        value={amount}
        type="range"
        // TODO: configure via Products API
        min="1000" max="200000" step="1000"
        onChange={({ target }) => onChange(target.value, duration)}
      />
    </div>

    <div>
      <label html="amount">Duration (in months)</label>
      <input
        name="duration"
        value={duration}
        type="range"
        // TODO: configure via Products API
        min="1" max="60" step="1"
        onChange={({ target })  => onChange(amount, target.value)}
      />
    </div>
  </form>

export default Inputs
