import React from 'react';

const Newsitem = (props) => {
  let { title, description, imageUrl, newsUrl, author, date, source, mode } = props;
  const cardStyle = {
    width: "20rem",
    backgroundColor: mode === 'dark' ? 'rgb(104, 107, 110)' : 'white',
    color: mode === 'dark' ? 'white' : 'black',
  };
  
  return (
    <div className="col">
      <div className="my-3">
        <div className="card h-100" style={cardStyle}>
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            position: 'absolute',
            right: '0'
          }}>
            <span className="badge rounded-pill bg-danger">{source}</span>
          </div>
          <img style={{ height: "200px" }} src={!imageUrl ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPMAAACUCAMAAABx2e/vAAAAPFBMVEXy9PWmp6f2+PmjpKTs7u+qq6vl5+jo6uu5uru8vb7LzMyen5/v8fLNz8+9v77g4uPU1dXExsawsbHZ29x6ieN/AAAFQklEQVR4nO2a6XLcIBCEOXUtEgje/10zA+jY01nHwVVb/f2wtRJa0xw9MyRCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPDjqK/47Q7+PC5MX2B+u4s/jTLDRb/k0v12H38a0iytlU+xVn+kZjnNz5ii/EzN2j31Lzd+qmbz2L35KWnuP829i2ZlpvWOpcuaZfnU/3ZPf46quY/39qW9Ys3Z4LT9oBV+aL41bzLsQ7P8TM1xDmfYsLNmOYc5fqTmQVtzZWDLppk8zC0fubYHHXvhdkQOUkVzRz8/UjOt3uXKteNZ8908b8HrYRVyde/2+sGD1rXMybevsuzDwx5pdl3XOXrZ+TAHb879VapPfFOUe4Za9q4+6/jD6Su60wvJu1ayd82Xe/wzzaofrZyVmCOl6tbGyR2z54d6c86qOxvjUN5VXbTRDqa09ZHgcUtjfSGOyYkW1DzM+Qc48VTzoPWgRr1F8k2IUJOW1zc51KXyLPB19Lmpm7XUC11Op4RAt0l87nPP41q80EwTs0um2mutD1bNRRpNJ+8NFs139FTmb80V3Fw001fqpEQ6XpB6bLO4N82PV9VLzdoOoXf9xAtT5hlSgQdg5aBHc5q1KhIlB7e9RLax5D/FBkLf6ShGypEyetGnxfqWmpWZq11PpG3dr19qpt5TX5VK1PtL4u5yLS7XbEV8V1L4E72tSZxKFBuClrHj5zQUenTC8NM+v0Be1kTxycM2v6bO7+btX2munaclQh/0yjsh8ZRvW3ssi5dnUucNPUs59CSRh4f2PS0DGqVYb7Tk8O1DM+8wurL2teZt9znuf9Y8091hc4NQVIlZl+1uKLNbFWnMu3vQ2dry2o5BNK1Vd99OBW/YamPwvBJfatbTWTMPgGO/Wk1fCFWr50WeI5WkeV+1HE1Z8bzyRWAPs2NoFpwPzVfJUFm2wxeaZbrVzCkq2VTFksst3JZLNvoLKe9c2tD0texsNDqCZ1/LbNxT30z0o1hlcxB9W3N1tvPx4SLK7JPF0S9JwcvTsIQcwehXfnuWutSrq2ukumq+8u2/1Owfaj6jR34eJD8mt+LtTYanSVzckxPqwWrLCLWqY2487JI97Jua+YBBB+VOcGPPApWnJcD2TYlaNIaj8p67KRGGnMTElrkniahTw2q/qbl62N0CzUPhODKzaSV6s+MVPp2/kFTLPGD/Vez21258O5lvr+0Sq+J9tyfKWfyqdc7Asn3TZN9EZdVtUf7/c+dh4h80+3iyNrEFXU5VNM2jnvkTmbueRrllNEfj6fc0qxqr1Pua+XAlj1fNJY3P+zNH5pHDfW7O6Vi0Ne02qRbfiiuQPeS30EzeORTGvJ/tMFKF/LZmMiq6b1dvnOnCaNfiSW7JtjyUCJwT1K28MjYuqRfKdROZyaVNkXHk2zWo0tKkn5x7SvmuZpFTjnriIjkoleYzxzBZPtUoXmsok1tzWONRaVpLckeq5jzP+/XzMwM+8t80X/bSl2f6OAPYNJeb1ZQ5OZGlvKQc9HyiPjZRfOQkaTvXpniyn3H3z8+GKLncNc9U8m/uo9zEh0N81DPM+9kXNx9qGaYCZ6bbzk1LSVP5ZKiJYLHP88NzErWdGbi7s14uJNz5w/GfEZToUgrJ96di6aqF608vK9rKnpubhkUGq0rCPSY/DcK/9+8Yb57dtj7qFfkQzi5P4Zp+pKUwtkkLG2EGLV+QKyVdY+unQHv2wdn2NfGzJAtW3b2mF013GwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgn/kDUC1LWtAOQrYAAAAASUVORK5CYII=" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 style={{ height: "75px", overflow: "hidden" }} className="card-title">{title}...</h5>
            <p style={{ height: "75px", overflow: "hidden" }} className="card-text">{description}...</p>
            <p style={{ height: "75px", overflow: "hidden" }} className='card-text'>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</p>
            <a href={newsUrl} target='_blank' className="btn btn-primary btn-sm">Read More</a>
          </div>  
        </div>
      </div>
    </div>
  );
}

export default Newsitem;
