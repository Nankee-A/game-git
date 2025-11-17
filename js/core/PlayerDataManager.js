class PlayerDataManager 
{
    static StorageKey = "PLAYER_DATAS";

    static _playerDatas = null;
    static get PlayerDatas()
    {
        if (this._playerDatas === null)
        {
            this._loadPlayerDatas();
        }
        return this._playerDatas;
    }

    static _loadPlayerDatas() 
    {
        try 
        {
            const saved = localStorage.getItem(this.StorageKey);
            if (!saved) 
            {
                this._playerDatas = [];
                return;
			}

			const datas = JSON.parse(saved);
            this._playerDatas = datas.map((item) => 
            {
                const playerData = new PlayerData
                    (
                        item.name,
                        item.password,
                        item.bestScore,
                        item.createdDate
                    );
                Object.assign(playerData, item);
                return playerData;
            });
        }
        catch (error)
        {
            console.error("Load player datas error:", error);
            this._playerDatas = [];
		}
	}

	/**
	 * 保存玩家数据
	 * @returns 是否保存成功
	 */
    static Save() 
    {
        try 
        {
            const datas = this.PlayerDatas.map((playerData) =>
            {
                const { name, password, bestScore, createdDate } = playerData;
                return { name, password, bestScore, createdDate };
            });

            localStorage.setItem(this.StorageKey, JSON.stringify(datas));
            return true;
        }
        catch (error)
        {
			console.error("Save player datas error:", error);
			return false;
		}
    }
}
