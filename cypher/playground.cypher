MATCH (n) DETACH
DELETE n;

CREATE (n {name: "n"}), (m {name:"m"}),  (m2 {name:"m2"});

MATCH (n), (m), (m2)
WHERE n.name = "n" AND m.name = "m" AND m2.name = "m2"
CREATE (n)-[r:joins{between:"n&m"}]->(m)-[:joins{between:"m&m2"}]->(m2)
RETURN n, r, m;

MATCH (n)-[r*]->(m)
WHERE n.name = "n" AND m.name = "m2"
RETURN n, r, m;

MATCH (n)-[r]->(m)
RETURN r;

MATCH (a) RETURN a;

MATCH (n) RETURN "total number of nodes: " +  count(*);
