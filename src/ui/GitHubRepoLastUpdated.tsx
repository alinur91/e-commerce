import { useState, useEffect } from "react";

interface Repository {
  updated_at: string;
}

const GitHubRepoLastUpdated = ({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) => {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    const fetchLastUpdated = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}`,
        );
        if (response.ok) {
          const data: Repository = await response.json();
          setLastUpdated(data.updated_at);
        } else {
          throw new Error(`Failed to fetch repository: ${response.statusText}`);
        }
      } catch (error) {
        console.log(error);
        console.error("Error fetching repository last updated date:", error);
      }
    };

    fetchLastUpdated();
  }, [owner, repo]);

  return (
    <div>
      {lastUpdated && (
        <p>Last updated: {new Date(lastUpdated).toLocaleString()}</p>
      )}
    </div>
  );
};

export default GitHubRepoLastUpdated;
