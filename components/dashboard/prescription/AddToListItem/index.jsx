const AddToListItem = ({SrvName , SrvCode , Img}) =>{
    return (
            <div class="card PrescItem" id="{response.data.res.info.checkCode}">
                <div class="card-body">
                    <div class="row">
                        <div class="col-auto"><img src={Img} height="30" /></div>
                        <div class="col">
                            {SrvCode} | {SrvName}
                        </div>
                        <div class="col-auto">
                        	<button type="button" class="btn btn-outline-primary btn-rounded"><i class="fe fe-star"></i></button>
                            <button type="button" class="btn btn-outline-danger btn-rounded" onclick="DeleteCheckService()"><i class="fe fe-trash"></i></button>
                        </div>
                    </div>
                </div>
            </div>
    )
}
export default AddToListItem