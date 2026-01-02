const NoDataFound = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      color: '#666'
    }}>
      <h2>No Data Found</h2>
      <p>There is nothing to display at the moment.</p>
    </div>
  )
}

export default NoDataFound