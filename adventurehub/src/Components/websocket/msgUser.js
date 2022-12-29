const MsgUser = (props) => {

    if (props.username) {
        return (<h2>Welcome: {props.username}</h2>)
    }

    return (
        <>
            <label htmlFor='username'>Welcome:</label>
            <input id='username' type='text' onBlur={(event) => props.onUsernameInformed(event.target.value)} />
        </>
    );
}
export default MsgUser