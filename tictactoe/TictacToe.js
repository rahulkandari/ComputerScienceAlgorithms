/**
 * Created by rahul.kandari on 09/04/16.
 */
function calculateWin(moveConfiguration){

    var returnObject = false;



    //var arr = [2,5,3,1,4];
    returnObject = combinationUtil(moveConfiguration,[],0,moveConfiguration.length-1,0,3)
    console.log("Test Win:"+returnObject);


    /*abc:
        returnObject = true;*/

   return returnObject;
}

/* arr[]  ---> Input Array
 data[] ---> Temporary array to store current combination
 start & end ---> Staring and Ending indexes in arr[]
 index  ---> Current index in data[]
 r ---> Size of a combination to be printed */
function combinationUtil(arr, data, start,
    end, index, r)
{


    // Current combination is ready to be printed, print it
    if (index == r)
    {
        var sum = 0;

        for (var j=0; j<r; j++)
        {
            sum += parseInt(data[j]);

         console.log(data[j]+" ");
         console.log("");
        }

        console.log("sum:"+sum);


        if(sum == 15)
        {

            return true;

        }

            return false;
    }

    // replace index with all possible elements. The condition
    // "end-i+1 >= r-index" makes sure that including one element
    // at index will make a combination with remaining elements
    // at remaining positions
    for (var i=start; i<=end && end-i+1 >= r-index; i++)
    {
        data[index] = arr[i];
         if(combinationUtil(arr, data, i+1, end, index+1, r))
        {
            return true;
        }
        else{
             continue;
         }



    }


}
