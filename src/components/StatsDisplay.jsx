import { Table } from 'react-bootstrap';


// use to display clean lines of stats data for the game cards
function StatsDisplay(props){

    const achievements = props.achievements;
    const globalData = props.globalData;
    
    return <>
    
    <Table striped bordered hover>
        <thead>
            <tr>
            <th>Achieved</th>
            <th>Not Achieved</th>
            <th>Global Percent Achieved</th>
            </tr>
        </thead>
        <tbody>
            {
                achievements?.map((ach, index) => {
                    let percent = props.globalData?.achievementpercentages?.
                        achievements?.find(a => a.name === ach.apiname)?.percent || 0;

                    return(
                        <tr key={ach.apiname + index}>
                            {ach.achieved ? (
                                <>
                                    <td>{ach.apiname}</td>
                                    <td></td>
                                    <td>{percent}%</td>
                                </>
                            ) : (
                                <>
                                    <td></td>
                                    <td>{ach.apiname}</td>
                                    <td>{percent}%</td>
                                </>
                            )}
                        </tr>
                    )
                })
            }
        </tbody>

    </Table>
    
    
    </>;
}

export default StatsDisplay;