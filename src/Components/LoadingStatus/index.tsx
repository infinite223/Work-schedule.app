import ReactLoading from 'react-loading';
 
const LoadingStatus = () => (
    <> <div className='blur-page'></div>

        <div style={{position:"absolute", zIndex:13}}>         
            <ReactLoading type="bubbles" color="#f0f" height={"50%"} width={280} />
        </div>
    </>
);
 
export default LoadingStatus;