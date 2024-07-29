import './SavingsAccountWidget.css'

const SavingsAccountWidget = ({ data }) => {
    return  (
        <>
            <div className='savingsWidget'>
                <h2>
                    {data.savingsName}
                </h2>
                <h3>
                    {data.bankName}
                </h3>
                <h2>
                    {data.balance}
                </h2>
            </div>
        </>
    )
}

export default SavingsAccountWidget
