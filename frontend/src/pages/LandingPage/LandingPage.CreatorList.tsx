import { useState, useEffect } from "react";
import client from "../../client";
import useAuthStore from "../../store/useAuthStore";

interface CreatorData {
  creatorId: number;
  creatorName: string;
  profileImg: string;
}

const CreatorList: React.FC = () => {
  const [creators, setCreators] = useState<CreatorData[]>([]);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const apiClient = client(accessToken || ""); // Ensure accessToken is passed to client
        const response = await apiClient.get("/api/creator/main", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const fetchedCreators = response.data.map((creator: CreatorData) => ({
          creatorId: creator.creatorId,
          creatorName: creator.creatorName,
          profileImg: creator.profileImg, // Ensure correct property name is used
        }));
        setCreators(fetchedCreators);
      } catch (err) {
        console.error("Error fetching creators", err);
      }
    };

    fetchCreators();
  }, [accessToken]);

  return (
    <div className="flex flex-col items-center w-full bg-white py-20">
      <div className="flex flex-col justify-center items-center py-20">
        <span className="text-h1 text-gray-900 font-bold">
          HiFive 크리에이터
        </span>
        <span className="text-h5 text-gray-900">
          이외에도 많은 분들이 하이파이브에서 활동 중이에요.
        </span>
      </div>
      <div className="flex overflow-hidden w-full">
        <div className="flex animate-scroll">
          {creators.map((creator) => (
            <div
              key={creator.creatorId} // Changed key to use creatorId
              className="flex flex-col items-center mx-5"
            >
              <div className="w-[150px] h-[150px] rounded-full overflow-hidden">
                <img
                  src={creator.profileImg}
                  alt={`Creator ${creator.creatorName}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="mt-2 text-h6 text-center">
                {creator.creatorName}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatorList;
