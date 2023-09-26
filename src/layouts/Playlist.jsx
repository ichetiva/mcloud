import React from "react"


const PlaylistLayout = ({playlist}) => {
    console.log(playlist)
    return (
        <>
        <div className="Build">
            <div className="obj picture"></div>
            <div className="obj punkts Films">
                <p>{playlist}</p>
            </div>
            <div className="obj punkts Years">
                <p>{playlist.Name}</p>
            </div>
            <div className="obj punkts Descriptions">
                <p>{playlist.Author}</p>
            </div>
            <div className="obj punkts Names">
                <p>{playlist.Description}</p>
            </div>
        </div>
    </>
    )
}
export default PlaylistLayout