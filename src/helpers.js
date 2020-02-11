export function collectionSnapshotToArray(snapshot) {
  var returnArr = [];

  snapshot.forEach(function(childSnapshot) {
    var item = childSnapshot.data();
    item.id = childSnapshot.id;

    returnArr.push(item);
  });

  return returnArr;
}
