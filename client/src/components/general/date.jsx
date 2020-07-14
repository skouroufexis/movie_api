import React from 'react';
import './date.scss';


//Date modal for capturing date inputs

var Date = function(props){
    let closedate=props.modal;
    return(

        <div className='container'>

            <div className='row'>

                <div className='col-12'>
                <label className='col-5'>Day
                </label>
                </div>

                <div className='col-12'>
                    <select className='col-2' id='day'>
                        <option>01</option>
                        <option>02</option>
                        <option>03</option>
                        <option>04</option>
                        <option>05</option>
                        <option>06</option>
                        <option>07</option>
                        <option>08</option>
                        <option>09</option>
                        <option>10</option>
                        <option>11</option>
                        <option>12</option>
                        <option>12</option>
                        <option>13</option>
                        <option>14</option>
                        <option>15</option>
                        <option>16</option>
                        <option>17</option>
                        <option>18</option>
                        <option>19</option>
                        <option>20</option>
                        <option>21</option>
                        <option>22</option>
                        <option>23</option>
                        <option>24</option>
                        <option>25</option>
                        <option>26</option>
                        <option>27</option>
                        <option>28</option>
                        <option>29</option>
                        <option>30</option>
                        <option>31</option>
                    </select>
                </div>
            </div>

            <div className='row'>
                <div className='col-12'>
                    <label className='col-5'>Month
                    </label>
                </div>

                <div className='col-12'>
                    <select className='col-2' id='month'>
                        <option value='01'>Jan</option>
                        <option value='02'>Feb</option>
                        <option value='03'>Mar</option>
                        <option value='04'>Apr</option>
                        <option value='05'>May</option>
                        <option value='06'>Jun</option>
                        <option value='07'>Jul</option>
                        <option value='08'>Aug</option>
                        <option value='09'>Sep</option>
                        <option value='10'>Oct</option>
                        <option value='11'>Nov</option>
                        <option value='12'>Dec</option>
                    </select>
                </div>
            </div>

            
            <div className='row'>
                <div className='col-12'>
                        <label className='col-5'>Year
                        </label>
                </div>
                <input className='col-5 date' id='year'></input>

            </div>


            <div className='row'>
                
                <button className='col-5 btn_secondary1' onClick={newdate} >save</button>

            </div>

            <div className='row'>
                
                <button className='col-5 btn_secondary2' onClick={()=>closedate()} >cancel</button>

            </div>

        </div>


    )


    function newdate(){
        let newday=document.getElementById('day').value;
        let newmonth =document.getElementById('month').value;
        let newyear=document.getElementById('year').value;
        
        localStorage.setItem('newday',newday);
        localStorage.setItem('newmonth',newmonth);
        localStorage.setItem('newyear',newyear);

        closedate();
    }

}

export {Date};