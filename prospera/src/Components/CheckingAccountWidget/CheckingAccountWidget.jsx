import './CheckingAccountWidget.css'

const CheckingAccountWidget = ({ data }) => {
    return  (
        <>
            <div>
                <h2>
                    {data.checkingName}
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

export default CheckingAccountWidget
